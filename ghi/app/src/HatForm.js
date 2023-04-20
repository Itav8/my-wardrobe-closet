import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HatForm() {
  const [locations, setLocations] = useState([]);

  const [formData, setFormData] = useState({
    fabric: "",
    style: "",
    color: "",
    pictureUrl: "",
    location: "",
  });

  const fetchLocationData = async () => {
    const url = "http://localhost:8100/api/locations/";
    const response = await fetch(url);
    if (response.ok) {
      const locationData = await response.json();
      setLocations(locationData.locations);
    }
  };

  useEffect(() => {
    fetchLocationData();
  }, []);

  // React Router Navigation hook
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8090/api/hats/";
    // Map formData to the correct fields for backend.
    const data = {
      fabric: formData.fabric,
      style: formData.style,
      color: formData.color,
      picture_url: formData.pictureUrl,
      location: formData.location,
    };

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      setFormData({
        fabric: "",
        style: "",
        color: "",
        pictureUrl: "",
        location: "",
      });
    }

    return navigate("/hats");
  };

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create A New Hat</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Style"
                required
                type="text"
                name="style"
                className="form-control"
              />
              <label htmlFor="style">Style</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Fabric"
                required
                type="text"
                name="fabric"
                className="form-control"
              />
              <label htmlFor="fabric">Fabric</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Color"
                required
                type="text"
                name="color"
                className="form-control"
              />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Picture URL"
                required
                type="text"
                name="pictureUrl"
                className="form-control"
              />
              <label htmlFor="pictureUrl">Picture URL</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                required
                name="location"
                id="location"
                className="form-select"
              >
                <option value="">Choose a Closet Location</option>
                {locations.map((location, i) => {
                  return (
                    <option key={i} value={location.id}>
                      {location.closet_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HatForm;
