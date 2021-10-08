module.exports = (sequelize, Sequelize) => {
    const Links = sequelize.define("links", {
      original_link: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate : {
           notEmpty: true,
           notNull: {
            msg: 'Original link can not be null'
        }
        }
      },
      shortened_link: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      counter: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
  
    return Links;
};