
'use strict';
const {
  Op,
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
   
    static addTodo({title,duedate}){
      return this.create({title: title,duedate:duedate,markAsComplete:false})
    }
 
   
    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
   
       return await  Todo.findAll({
        
       });
        }
        static async duelater() {
          // FILL IN HERE TO RETURN OVERDUE ITEMS
       
           return await  Todo.findAll({
              where:{
                duedate:{
                [Op.gt] : new Date(),
                },
           }
           });
            }
    markAsCompleted (){
      return this.update({ markAsComplete:true})
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    duedate: DataTypes.DATEONLY,
    markAsComplete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
