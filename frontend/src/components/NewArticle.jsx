import React from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";

function NewArticle() {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          placeholder="title"
          {...register("title", { required: true })}
        />
        {errors.title && <span>This field is required</span>}
        <label htmlFor="title">Article:</label>
        <input
          type="textArea"
          id="article"
          placeholder="enter your text here"
          {...register("body", { required: true })}
        />
        {errors.body && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </section>
  );
}

export default NewArticle;
