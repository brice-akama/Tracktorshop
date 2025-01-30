
"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface User {
  _id: string;
  email: string;
  createdAt: string;
}

interface Subscription {
  _id: string;
  email: string;
  subscribedAt: string;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const AdminUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/register");
        const data = await response.json();
        if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          toast.error("Invalid response structure for users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // Fetch newsletter subscriptions
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch("/api/newsletter");
        const data = await response.json();
        if (Array.isArray(data.subscriptions)) {
          setSubscriptions(data.subscriptions);
        } else {
          toast.error("Invalid response structure for subscriptions");
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        toast.error("Failed to fetch subscriptions");
      }
      setLoading(false);
    };
    fetchSubscriptions();
  }, []);

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/contact");
        const data = await response.json();
        if (Array.isArray(data.contacts)) {
          setContacts(data.contacts);
        } else {
          toast.error("Invalid response structure for contacts");
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        toast.error("Failed to fetch contacts");
      }
      setLoading(false);
    };
    fetchContacts();
  }, []);

  const handleUserDelete = async (userId: string) => {
    try {
      const response = await fetch("/api/register", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      });
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("User deleted successfully");
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  const handleSubscriptionDelete = async (id: string) => {
    try {
      const response = await fetch("/api/newsletter", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Subscription deleted successfully");
        setSubscriptions((prev) => prev.filter((sub) => sub._id !== id));
      }
    } catch (error) {
      console.error("Error deleting subscription:", error);
      toast.error("Error deleting subscription");
    }
  };

  return (
    <div>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Created At</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{new Date(user.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleUserDelete(user._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <section>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Manage Newsletter Subscriptions</h2>
          {loading ? (
            <p>Loading subscriptions...</p>
          ) : subscriptions.length === 0 ? (
            <p>No subscriptions found.</p>
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Subscribed At</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub._id} className="border-t">
                    <td className="px-4 py-2">{sub.email}</td>
                    <td className="px-4 py-2">{new Date(sub.subscribedAt).toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleSubscriptionDelete(sub._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Manage Contacts</h2>
          {loading ? (
            <p>Loading contacts...</p>
          ) : contacts.length === 0 ? (
            <p>No contacts found.</p>
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-left">Message</th>
                  <th className="px-4 py-2 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact._id} className="border-t">
                    <td className="px-4 py-2">{contact.name}</td>
                    <td className="px-4 py-2">{contact.email}</td>
                    <td className="px-4 py-2">{contact.subject}</td>
                    <td className="px-4 py-2">{contact.message}</td>
                    <td className="px-4 py-2">{new Date(contact.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminUserManagement;
