import bcrypt from 'bcryptjs'
const Users = [
    {
        name : 'Human Resource manager',
        email : 'humaresource@gmail.com',
        password : bcrypt.hashSync('humanresource2023',12),
        isAdmin : true
    },

    
]
export default Users