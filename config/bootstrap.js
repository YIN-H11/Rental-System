/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  sails.bcrypt = require('bcryptjs');
  const saltRounds = 10;
  if (await Rental.count() == 0) {
    
    await Rental.createEach([
      { propertytitle:"Shopping centre",ImageURL:"/images/a.png",Estate:"Tin Ma Court",Bedrooms:1,Rent:1000,CrossArea:"100",ExpectedTenants:"1" ,highlightedProperty:"on",rentor:"0"},
      { propertytitle:"Large Swimming poor",ImageURL:"/images/b.png",Estate:"Festival City",Bedrooms:2,Rent:2000,CrossArea:"200",ExpectedTenants:"2",highlightedProperty:"on",rentor:"0"},
      { propertytitle:"Garden City",ImageURL:"/images/c.png",Estate:"Tin Ma Court",Bedrooms:2,Rent:3000,CrossArea:"300",ExpectedTenants:"2",highlightedProperty:"on",rentor:"0"},
      { propertytitle:"The cheapest price in whole city",ImageURL:"/images/d.png",Estate:"City One Shatin",Bedrooms:2,Rent:4000,CrossArea:"400",ExpectedTenants:"2" ,highlightedProperty:"on",rentor:"0"}
      
      // etc.
      
    ]);
}


if (await Rental.count() > 0) {
  return generateUsers();
}
return generateUsers();

async function generateUsers() {

  if (await User.count() > 0) {
    return;
  }
  
  const hash = await sails.bcrypt.hash('123456', saltRounds);
  
  await User.createEach([
    { username: "admin", password: hash, role:"admin" },
    { username: "BOB", password: hash,role:"client" },
    { username: "TIM", password: hash,role:"client" },
    { username: "JIM", password: hash,role:"client" },
    // etc.
  ]);
  
  // const martin = await Rental.findOne({ name: "Martin Choy" });
  // const kenny = await Rental.findOne({ name: "Kenny Cheng" });
  // const admin = await User.findOne({ username: "admin" });
  // const boss = await User.findOne({ username: "boss" });
  
  // await User.addToCollection(admin.id, 'supervises').members(kenny.id);
  // await User.addToCollection(boss.id, 'supervises').members([martin.id, kenny.id]);

}

// if (await User.count() == 0) {

//   const hash = await sails.bcrypt.hash('123456', saltRounds);

//   await User.createEach([
//       { username: "admin", password: hash },
//       { username: "boss", password: hash }
//       // etc.
//   ]);

//   const martin = await Rental.findOne({name: "Martin Choy"});
// const kenny = await Rental.findOne({name: "Kenny Cheng"});
// const admin = await User.findOne({username: "admin"});
// const boss = await User.findOne({username: "boss"});

// await User.addToCollection(admin.id, 'supervises').members(kenny.id);
// await User.addToCollection(boss.id, 'supervises').members([martin.id, kenny.id]);
// return;
// }


// const martin = await Rental.findOne({name: "Martin Choy"});
// const kenny = await Rental.findOne({name: "Kenny Cheng"});
// const admin = await User.findOne({username: "admin"});
// const boss = await User.findOne({username: "boss"});

// await User.addToCollection(admin.id, 'supervises').members(kenny.id);
// await User.addToCollection(boss.id, 'supervises').members([martin.id, kenny.id]);
// return;

};
