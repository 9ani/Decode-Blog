const User = require('../auth/User');
const bcrypt = require('bcrypt');

const addUser = async (req, res) => {
    try {
        const { email, full_name, password, isAdmin } = req.body;

        if (!(email && full_name && password)) {
            return res.status(400).json({ error: 'Email, full name, and password are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            full_name,
            password: hashedPassword,
            isAdmin: isAdmin || false,
        });

        await newUser.save();

        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const editUserbyAdmin = async (req, res) => {
    try {
        const userId = req.params.id;
        const { email, full_name, isAdmin } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.email = email;
        user.full_name = full_name;
        user.isAdmin = isAdmin || false;

        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

 const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // await user.remove();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = { addUser, editUserbyAdmin, deleteUser};
// async function addUser() {
//     const full_name = document.getElementById('addUsername').value;
//     const password = document.getElementById('addPassword').value;
//     const isAdmin = document.getElementById('isAdmin').checked;
  
//     try {
//       const response = await fetch('/admin/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: `username=${encodeURIComponent(full_name)}&password=${encodeURIComponent(password)}&isAdmin=${isAdmin}`,
//       });
  
//       if (response.ok) {
//         location.reload();
//       } else {
//         console.error('Failed to add user');
//       }
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   }
  
//   async function editUser(userId, username, isAdmin) {
//       document.getElementById("editForm").innerHTML = "";
  
//       // Create and append form elements
//       const label = document.createElement("label");
//       label.setAttribute("for", `editUsername_${userId}`);
//       label.textContent = "Username:";
  
//       const input = document.createElement("input");
//       input.setAttribute("type", "text");
//       input.setAttribute("id", `editUsername_${userId}`);
//       input.setAttribute("name", "username");
//       input.setAttribute("required", "true");
//       input.value = username;
  

//       const labelIsAdmin = document.createElement("label");
//       labelIsAdmin.setAttribute("for", `editIsAdmin_${userId}`);
//       labelIsAdmin.textContent = "Is Admin?";

//       const isAdminCheckbox = document.createElement("input");
//       isAdminCheckbox.setAttribute("type", "checkbox");
//       isAdminCheckbox.setAttribute("id", `editIsAdmin_${userId}`);
//       isAdminCheckbox.setAttribute("name", "isAdmin");
//       isAdminCheckbox.checked = isAdmin;
  
//       const submitButton = document.createElement("button");
//       submitButton.setAttribute("type", "button");
//       submitButton.textContent = "Edit User";
//       submitButton.addEventListener("click", () => submitEditUser(userId));
  
//             document.getElementById("editForm").appendChild(label);
//       document.getElementById("editForm").appendChild(input);
//       document.getElementById("editForm").appendChild(labelIsAdmin); 
//       document.getElementById("editForm").appendChild(isAdminCheckbox);
//       document.getElementById("editForm").appendChild(submitButton);
//           }
  
//     async function submitEditUser(userId) {
//       const username = document.getElementById(`editUsername_${userId}`).value;
//       const isAdmin = document.getElementById(`editIsAdmin_${userId}`).checked;
  
//       try {
//         const response = await fetch(`/admin/edit/${userId}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: `username=${encodeURIComponent(username)}&isAdmin=${isAdmin}`,
//         });
  
//         if (response.ok) {
//           location.reload();
//         } else {
//           console.error('Failed to edit user');
//         }
//       } catch (error) {
//         console.error('Error editing user:', error);
//       }
//     }
  
  
//       async function deleteUser(userId) {
//         if (confirm('Are you sure you want to delete this user?')) {
//           try {
//             const response = await fetch(`/admin/delete/${userId}`, {
//               method: 'POST',
//             });
  
//             if (response.ok) {
//               location.reload();
//             } else {
//               console.error('Failed to delete user');
//             }
//           } catch (error) {
//             console.error('Error deleting user:', error);
//           }
//         }
//       }