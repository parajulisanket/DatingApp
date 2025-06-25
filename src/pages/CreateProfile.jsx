import React, { useState } from 'react';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phone: '',
  bio: '',
  gender: '',
  dob: '',
  age: '',
  location: '',
  city: '',
  country: '',
  interests: '',
};

const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];

const CreateProfile = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  // Handle change for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Simple validation
  const validate = () => {
    let temp = {};
    if (!form.firstName) temp.firstName = 'First name is required';
    if (!form.lastName) temp.lastName = 'Last name is required';
    if (!form.username) temp.username = 'Username is required';
    if (!form.email) temp.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(form.email)) temp.email = 'Email is invalid';
    if (!form.phone) temp.phone = 'Phone number is required';
    if (!form.dob) temp.dob = 'Date of birth is required';
    if (!form.age || isNaN(form.age)) temp.age = 'Valid age required';
    if (!form.gender) temp.gender = 'Gender is required';
    if (!form.country) temp.country = 'Country is required';
    if (!form.city) temp.city = 'City is required';
    if (!form.interests) temp.interests = 'At least one interest required';
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // You can handle the submission here (e.g., send to backend)
      alert('Profile created!\n' + JSON.stringify(form, null, 2));
      setForm(initialState);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border focus:outline-none"
            required
          />
          {errors.firstName && <span className="text-red-500">{errors.firstName}</span>}
        </div>
        {/* Last Name */}
        <div>
          <label className="block font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
            required
          />
          {errors.lastName && <span className="text-red-500">{errors.lastName}</span>}
        </div>
        {/* Username */}
        <div>
          <label className="block font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
            required
          />
          {errors.username && <span className="text-red-500">{errors.username}</span>}
        </div>
        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
            required
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>
        {/* Phone */}
        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
            required
          />
          {errors.phone && <span className="text-red-500">{errors.phone}</span>}
        </div>
        {/* Bio */}
        <div>
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
            rows={2}
          />
        </div>
        {/* Gender */}
        <div>
          <label className="block font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
            required
          >
            <option value="">Select</option>
            {genders.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          {errors.gender && <span className="text-red-500">{errors.gender}</span>}
        </div>
        {/* DOB */}
        <div>
          <label className="block font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
            required
          />
          {errors.dob && <span className="text-red-500">{errors.dob}</span>}
        </div>
        {/* Age */}
        <div>
          <label className="block font-medium mb-1">Age</label>
          <input
            type="number"
            name="age"
            min="0"
            value={form.age}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
            required
          />
          {errors.age && <span className="text-red-500">{errors.age}</span>}
        </div>
        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
          />
        </div>
        {/* City */}
        <div>
          <label className="block font-medium mb-1">City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
            required
          />
          {errors.city && <span className="text-red-500">{errors.city}</span>}
        </div>
        {/* Country */}
        <div>
          <label className="block font-medium mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
            required
          />
          {errors.country && <span className="text-red-500">{errors.country}</span>}
        </div>
        {/* Interests */}
        <div>
          <label className="block font-medium mb-1">Interests <span className="text-xs text-gray-400">(comma separated)</span></label>
          <input
            type="text"
            name="interests"
            value={form.interests}
            onChange={handleChange}
            className="w-full p-2 rounded-xl border"
            placeholder="e.g. Coding, Reading, Hiking"
            required
          />
          {errors.interests && <span className="text-red-500">{errors.interests}</span>}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl font-bold mt-4 hover:bg-blue-700 transition"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
