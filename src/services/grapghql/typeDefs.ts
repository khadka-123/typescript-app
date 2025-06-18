const typeDefs = `
        type Todo{
          userId:Int
          id:Int
          title:String!
          completed:Boolean
        }
          type Query{
          getTodos:[Todo]
          }
        `
export default typeDefs;