import { useEffect, useState } from "react";
import MainLayout from "../components/Layout/MainLayout";

import {
  getApis,
  addApi,
  updateApi,
  deleteApi,
} from "../services/apiService";

import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaTimes,
  FaGlobe,
  FaClock,
  FaCode,
} from "react-icons/fa";

import "../styles/apiManagement.css";

function ApiManagement() {

  const [apis, setApis] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    url: "",
    method: "GET",
    check_interval: 60,
  });

  const loadApis = async () => {

    try {

      setLoading(true);

      const data = await getApis();

      setApis(data);

    } catch (err) {

      console.log(err);

      setError("Unable to load APIs.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadApis();

  }, []);

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const clearForm = () => {

    setEditingId(null);

    setForm({

      name: "",

      url: "",

      method: "GET",

      check_interval: 60,

    });

  };

  const showMessage = (text) => {

    setMessage(text);

    setTimeout(() => {

      setMessage("");

    }, 3000);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      if (editingId) {

        await updateApi(editingId, form);

        showMessage("API updated successfully.");

      } else {

        await addApi(form);

        showMessage("API added successfully.");

      }

      clearForm();

      loadApis();

    } catch (err) {

      console.log(err);

      setError("Operation failed.");

    }

  };

  const handleEdit = (api) => {

    setEditingId(api.id);

    setForm({

      name: api.name,

      url: api.url,

      method: api.method,

      check_interval: api.check_interval,

    });

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this API?")) return;

    try {

      await deleteApi(id);

      showMessage("API deleted successfully.");

      loadApis();

    } catch (err) {

      console.log(err);

      setError("Delete failed.");

    }

  };

  return (

    <MainLayout>

      <div className="api-page">

        <h1>API Management</h1>

        <p>Manage and monitor your registered APIs.</p>

        {message && (

          <div className="success-message">

            {message}

          </div>

        )}

        {error && (

          <div className="error-message">

            {error}

          </div>

        )}

        <div className="api-form-card">

          <h2>

            {editingId ? "Edit API" : "Add New API"}

          </h2>

          <form onSubmit={handleSubmit}>

            <input

              type="text"

              name="name"

              placeholder="API Name"

              value={form.name}

              onChange={handleChange}

              required

            />

            <input

              type="text"

              name="url"

              placeholder="https://example.com/api"

              value={form.url}

              onChange={handleChange}

              required

            />

            <select

              name="method"

              value={form.method}

              onChange={handleChange}

            >

              <option>GET</option>

              <option>POST</option>

              <option>PUT</option>

              <option>DELETE</option>

            </select>

            <input

              type="number"

              name="check_interval"

              value={form.check_interval}

              onChange={handleChange}

            />

            <button type="submit">

              <FaPlus />

              {editingId ? " Update API" : " Add API"}

            </button>

            {editingId && (

              <button

                type="button"

                className="cancel-btn"

                onClick={clearForm}

              >

                <FaTimes />

                Cancel

              </button>

            )}

          </form>

        </div>

        <div className="api-table-card">

          <h2>Registered APIs</h2>

          {loading ? (

            <p>Loading APIs...</p>

          ) : (

            <table>

              <thead>

                <tr>

                  <th>Name</th>

                  <th>URL</th>

                  <th>Method</th>

                  <th>Interval</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {apis.length === 0 ? (

                  <tr>

                    <td colSpan="5">

                      No APIs Registered

                    </td>

                  </tr>

                ) : (

                  apis.map((api) => (

                    <tr key={api.id}>

                      <td>

                        <FaGlobe />{" "}

                        {api.name}

                      </td>

                      <td>{api.url}</td>

                      <td>

                        <span className="method">

                          <FaCode />{" "}

                          {api.method}

                        </span>

                      </td>

                      <td>

                        <FaClock />{" "}

                        {api.check_interval}s

                      </td>

                      <td>

                        <button

                          className="edit-btn"

                          onClick={() => handleEdit(api)}

                        >

                          <FaEdit />

                        </button>

                        <button

                          className="delete-btn"

                          onClick={() => handleDelete(api.id)}

                        >

                          <FaTrash />

                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </MainLayout>

  );

}

export default ApiManagement;