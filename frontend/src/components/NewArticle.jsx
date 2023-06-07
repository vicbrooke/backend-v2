import React from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";

function NewArticle({ setViewForm }) {
  const { user, getAccessTokenSilently } = useAuth0();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const token = await getAccessTokenSilently();
      data.username = user.nickname;
      data.email = user.email;
      const response = await axios.post(
        `http://localhost:4000/articles`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Your article has been submitted successfully!");
    } catch (error) {}
  };
  return (
    <section className="form-container">
      <button className="form-btn" onClick={() => setViewForm(false)}>
        Close form
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="title-container">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            placeholder="title"
            {...register("title", { required: true })}
          />
        </div>
        {errors.title && <span>*This field is required</span>}
        <div className="body-container">
          <label htmlFor="title">Article:</label>
          <textarea
            id="article"
            placeholder="enter your text here"
            {...register("body", { required: true })}
          />
        </div>
        {errors.body && <span>*This field is required</span>}

        <input type="submit" className="submit-btn" />
      </form>
    </section>
  );
}

export default NewArticle;
