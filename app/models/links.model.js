module.exports = (sequelize, Sequelize) => {
    const Links = sequelize.define("links", {
      original_link: {
        type: Sequelize.TEXT
      },
      shortened_link: {
        type: Sequelize.STRING
      },
      counter: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
  
    return Links;
};