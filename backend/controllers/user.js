const mongoose = require("mongoose");
const {UserModel} = require("../models/userModel");
// const { faker } = require('@faker-js/faker/locale/en');
const fakeData = require('./fakeUsersData')

async function getUsers(req, res) {
  
  try {
    const { search, page, pageSize } = req.query;

    let query = {};

    // Apply search filter if provided
    if (search && search != '') {
      query = {
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { city: { $regex: search, $options: 'i' } },
          
        ],
      };
    }

    // Calculate pagination options
    const currentPage = parseInt(page) || 1;
    const perPage = parseInt(pageSize) || 10;
    const skip = (currentPage - 1) * perPage;

    const totalUsers = await UserModel.count(query);
    const users = await UserModel.find(query)
      .skip(skip)
      .limit(perPage)
      .exec();

    res.json({
      users,
      currentPage,
      totalPages: Math.ceil(totalUsers / perPage),
      totalUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteUser(req, res){
  try {
    const userId = req.params.id;

    const deletedUser = await UserModel.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createFakeData(req, res){
  


  // const createRowData = rowIndex => {
  //   const firstName = faker.person.firstName();
  //   const lastName = faker.person.lastName();
  //   const gender = faker.person.sex();
  //   const name = faker.person.fullName({ firstName, lastName, sex: gender });
  //   const avatar = faker.image.avatar();

  //   const city = faker.location.city();
  //   const street = faker.location.street();
  //   const email = faker.internet.email();
  //   const postcode = faker.location.zipCode();
  //   const phone = faker.phone.number();
  //   const amount = faker.finance.amount({ min: 1000, max: 90000 });
  //   const company = faker.company.name();

  //   const age = Math.floor(Math.random() * 30) + 18;
  //   const stars = Math.floor(Math.random() * 10000);
  //   const followers = Math.floor(Math.random() * 10000);
  //   const rating = 2 + Math.floor(Math.random() * 3);
  //   const progress = Math.floor(Math.random() * 100);

  //   return {
  //     id: rowIndex + 1,
  //     name,
  //     firstName,
  //     lastName,
  //     avatar,
  //     city,
  //     street,
  //     postcode,
  //     email,
  //     phone,
  //     gender,
  //     age,
  //     stars,
  //     followers,
  //     rating,
  //     progress,
  //     amount,
  //     company
  //   };
  // };

  // let data =  Array.from({ length }).map((_, index) => {
  //   return createRowData(index);
  // });

  await UserModel.insertMany(fakeData)
  res.status(200)

}

module.exports = {
  getUsers,
  deleteUser,
  createFakeData
};
