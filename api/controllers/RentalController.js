/**
 * RentalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    // action - home
    home: async function (req, res) {

        var models = await Rental.find({

            where: { highlightedProperty: 'on' },
            limit: 4,
            sort: 'createdAt DESC'
        });

        return res.view('rental/home', { rental: models });
    },


    // action - create
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('rental/create');

        await Rental.create(req.body.Rental);
        
        return res.redirect("/rental/home");
     // return res.ok("Successfully creat!");
    },

    admin: async function (req, res) {

        var models = await Rental.find();
        return res.view('rental/admin', { rental: models });
    },
    // detail
    detail: async function (req, res) {
        
        let userName = req.session.username;
        if(req.session.role=='client'){
            var user = await User.findOne({username : userName});
            var userid = user.id;
            var models = await Rental.findOne(req.params.id).populate("worksFor", { id: user.id });
            //var model = await Rental.findOne(req.params.id);
            var Rentin = models.worksFor.length;
            
        
        } 
        var model = await Rental.findOne(req.params.id);
        var rentalid = model.id;
        if (!model) return res.notFound();
        return res.view('rental/detail', { rental: model,Rentin:Rentin,userid:userid,rentalid:rentalid });
        
    },

    // json function
    json: async function (req, res) {

        var rental = await Rental.find();

        return res.json(rental);
    },

    // action - update
    update: async function (req, res) {

        console.log("before if");

        if (req.method == "GET") {

            var model = await Rental.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('rental/update', { rental: model });

        } else {
            
            console.log("in else block");
            // req.body.Rental = await Rental.findOne(req.params.id)
            if (!req.body.Rental)
                return res.badRequest("Form-data not received.");

            var models = await Rental.update(req.params.id).set({
                propertytitle: req.body.Rental.propertytitle,
                ImageURL: req.body.Rental.ImageURL,
                Estate: req.body.Rental.Estate,
                Bedrooms: req.body.Rental.Bedrooms,
                Rent: req.body.Rental.Rent,
                CrossArea: req.body.Rental.CrossArea,
                ExpectedTenants: req.body.Rental.ExpectedTenants,
                highlightedProperty: req.body.Rental.highlightedProperty

            }).fetch();

            if (models.length == 0) return res.notFound();
            console.log("1");

            // if (req.wantsJSON){
            //     return res.json({message: "Person deleted.", url: '/rental/admin'});    // for ajax request
            // } else {
                
                return res.redirect('/');           // for normal request
            // }
            // console.log("2");
            // return res.ok("Record updated");

        }
    },
    // action - delete 
    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Rental.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        //return res.ok("Rental Deleted.");
        // return res.redirect("/");
        if (req.wantsJSON){
            return res.json({message: "Rental deleted.", url: '/'});    // for ajax request
        } else {
            return res.redirect('/');           // for normal request
        }
    },

    // search function
    search: async function (req, res) {

        const qPage = Math.max(req.query.page - 1, 0) || 0;
        const numOfItemsPerPage = 2;

        const qEstate = req.query.Estate || "";
        const qBedrooms = parseInt(req.query.Bedrooms);

        const minArea = parseInt(req.query.minArea) || 0;
        const maxArea = parseInt(req.query.maxArea) || 9999999;

        const minRent = parseInt(req.query.minRent) || 0;
        const maxRent = parseInt(req.query.maxRent) || 9999999;


        var num = 0;
        var models = null;

        var code = "";

        if (qEstate == "") {
            models = await Rental.find({
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });

            num = await Rental.count();
        } else if (isNaN(qBedrooms)) {

            code = "Estate=" + qEstate;
            models = await Rental.find({
                where: {
                    Estate: { contains: qEstate },
                    CrossArea: {
                        ">=": minArea,
                        "<=": maxArea
                    },
                    Rent: {
                        ">=": minRent,
                        "<=": maxRent
                    }
                },
                sort: 'Estate',
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });

        } else {
            code = "Estate=" + qEstate + "&Bedrooms=" + qBedrooms;
            models = await Rental.find({
                where: {
                    Estate: { contains: qEstate },
                    Bedrooms: qBedrooms,
                    CrossArea: {
                        ">=": minArea,
                        "<=": maxArea
                    },
                    Rent: {
                        ">": minRent,
                        "<": maxRent
                    }
                },
                sort: 'Estate',
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });

        }

        code = code + "&minArea=" + minArea + "&maxArea=" + maxArea + "&minRent=" + minRent + "&maxRent=" + maxRent;

        // var numOfPage = Math.ceil(num / numOfItemsPerPage);
        var numOfPage = Math.ceil(await Rental.count() / numOfItemsPerPage);
        return res.view('rental/search', { rental: models, count: numOfPage, code: code });
    },
   
    

    populate: async function (req, res) {

        var model = await Rental.findOne(req.params.id).populate("worksFor");

        if (!model) return res.notFound();

        return res.json(model);

    },

};

