const SequelizeAuto = require('sequelize-auto')
const auto = new SequelizeAuto('ad4u', 'root', 'ad4uad4u', {
    host: "db-ad4u.cyupkym6gvxk.ap-northeast-2.rds.amazonaws.com",
    port: '3306',
    dialect: 'mysql'
})

auto.run();