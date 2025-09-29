import { useEffect, useState } from "react";

export default function UsersPage() {
  const API_URL = "http://localhost:3000/users"; // API base URL
  const [users, setUsers] = useState([]); // State to store users data
  const [form, setForm] = useState({ // State for form inputs
    username: "", password: "", role: "", email: "", phoneNumber: "", address: "", companyName: ""
  });
  const [editingUser, setEditingUser] = useState(null); // State to track user being edited

  // Fetch all users on page load
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Set user data for editing
  const editUser = (user) => {
    setEditingUser(user.username);
    setForm(user);
  };

  // Update user details in API
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/${editingUser}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Failed to update user");
      fetchUsers(); // Refresh user list
      setEditingUser(null);
      setForm({ username: "", password: "", role: "", email: "", phoneNumber: "", address: "", companyName: "" });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user from API
  const deleteUser = async (username) => {
    try {
      const response = await fetch(`${API_URL}/${username}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete user");
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4"> {/* Main container */}
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* User Form */}
      <form onSubmit={updateUser} className="mb-4 flex flex-wrap gap-2"> {/* User update form */}
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} className="border p-2 rounded" required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="role" placeholder="Role" value={form.role} onChange={handleChange} className="border p-2 rounded" />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="companyName" placeholder="Company Name" value={form.companyName} onChange={handleChange} className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded">Update User</button>
      </form>

      {/* Users Table */}
      <table className="w-full border-collapse border border-gray-300"> {/* User list table */}
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Username</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username} className="text-center border-t"> {/* Table row for each user */}
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.phoneNumber}</td>
              <td className="border p-2">{user.companyName}</td>
              <td className="border p-2 flex justify-center gap-2"> {/* Action buttons */}
                <button onClick={() => editUser(user)} className="bg-green-500 px-2 py-1 rounded block">Edit</button>
                <button onClick={() => deleteUser(user.username)} className="bg-red-500 px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
