import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";

import FormField from "../components/FormField";
import Loader from "../components/Loader";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImg = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);

        const response = await axios.post(
          "https://ai-image-generation-4n3s.onrender.com/api/v1/dalle/",
          { prompt: form.prompt }
        );
        const data = response.data;
        setForm({ ...form, photo: data});
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await axios.post("https://ai-image-generation-4n3s.onrender.com/api/v1/post", form);
        navigate('/')
      } catch(error) {
        alert(error)
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image")
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Create imaginative and visually stunning images though DALL-E AI and
          share them with the community
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Nicolas Pham"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Promp"
            type="text"
            name="prompt"
            placeholder='a sea otter with a pearl earring" by Johannes Vermeer'
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preivew"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImg}
            className="w-full bg-green-700 text-white py-2.5 px-5 font-medium rounded-md text-sm sm:w-auto text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            You can click the button below to share your image to the community
          </p>
          <button
            type="submit"
            className="mt-3 font-medium bg-[#6469ff] text-white rounded-md text-md sm:w-auto py-2.5 px-5 w-full text-center"
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
