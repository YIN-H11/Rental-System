/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');
    
        if (!req.body.username || !req.body.password) return res.badRequest();
    
        var user = await User.findOne({ username: req.body.username });
    
        if (!user) return res.status(401).send("User not found");
    
        // if (user.password != req.body.password) 
        //     return res.status(401).send("Wrong Password");
        const match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) return res.status(401).send("Wrong Password");
        
        req.session.regenerate(function (err) {
    
            if (err) return res.serverError(err);
    
            req.session.username = req.body.username;
   
            req.session.role = user.role;
            

            sails.log("[Session] ", req.session);
            
            if (req.wantsJSON) {
                return res.json({ message: "User login.", url: '/' }); // for ajax request
            } else {
                return res.redirect('/'); // for normal request
            }
           //return res.redirect("/");
            // return res.ok("Login successfully.");
            
    
        });
    
    },

    
    logout: async function (req, res) {

        req.session.destroy(function (err) {
        
            if (err) return res.serverError(err);
            
            // return res.ok("Log out successfully.");
            return res.redirect("/");
            
        });
    },

    add: async function (req, res) {

        
        const rentalid = req.params.id;
        console.log(rentalid);
        
        const thatPerson = req.session.username;
       
        console.log(thatPerson);
        if (!thatPerson) return res.status(401).send("You need to login");
        
        const user = await User.findOne({username : thatPerson});
        const rental = await Rental.findOne({id : rentalid});

        if(rental.rentor==rental.ExpectedTenants){
            return res.status(401).send("There is no room to rent.")
        }
        // if (user.worksFor.length)
        //     return res.status(409).send("Already added.");   // conflict
        var models = await Rental.update(req.params.id).set({
                                
            rentor: rental.rentor+1

        }).fetch();

        await User.addToCollection(user.id, "supervises").members(rental.id);

        if (req.wantsJSON) {
            return res.json({ message: "successfully move in.", url: '/' }); // for ajax request
        } else {
            return res.redirect('/'); // for normal request
        };
        //return res.ok('co-rent success.');
    
    },

    remove: async function (req, res) {

        const rentalid = req.params.id;
        console.log("rentalid")
        console.log(rentalid);
        
        const thatPerson = req.session.username;
        console.log("thatPerson")
        console.log(thatPerson);
        if (!thatPerson) return res.status(401).send("You need to login");
        
        const user = await User.findOne({username : thatPerson});
        const rental = await Rental.findOne({id : rentalid});

        // if(rental.rentor==rental.ExpectedTenants){
        //     return res.status(401).send("There is no room to rent.")
        // }
        // if (user.worksFor.length)
        //     return res.status(409).send("Already added.");   // conflict
        var models = await Rental.update(req.params.id).set({
                                
            rentor: rental.rentor-1

        }).fetch();

        await User.removeFromCollection(user.id, "supervises").members(rental.id);

        if (req.wantsJSON) {
            return res.json({ message: "successfully move out.", url: '/' }); // for ajax request
        } else {
            return res.redirect('/'); // for normal request
        };
        //return res.ok('move out success.');
    
        
       
    
    },
    populate: async function (req, res) {

        var model = await User.findOne(req.params.id).populate("supervises");
    
        if (!model) return res.notFound();
    
        return res.json(model);
    
    },
    myrental: async function(req, res) {
        let userName = req.session.username;
        const user = await User.findOne({ username: userName });
        userId = user.id;
        var model = await User.findOne(userId).populate("supervises");
        if (!model) return res.notFound();
        //return res.view('user/myrental', { rental: model.rent });
        return res.view('user/myrental', { rental: model.supervises });
    },
    
    occupants:async function (req, res){
        var model = await Rental.findOne(req.params.id);
        console.log(req.params.id);
        userId = model.id;
        var models =await Rental.findOne(userId).populate("worksFor");
        return res.view('user/occupants', { rental: models.worksFor , model:model});
        
       
    },    

};

