import React from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";

function EditArticleModal({ article, showModal, setShowModal, onUpdate }) {
  const { user, getAccessTokenSilently } = useAuth0();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!showModal) {
    return null;
  }

  const onSubmit = async (data) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.put(
        `http://localhost:4000/articles/${article.id}/${user.nickname}`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setShowModal(false);
      alert("Your article has been updated successfully!");
      onUpdate();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <section className="modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="title-container">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            defaultValue={article.title}
            {...register("title", { required: true })}
          />
        </div>
        {errors.title && <span>*This field is required</span>}
        <div className="body-container">
          <label htmlFor="title">Article:</label>
          <textarea
            id="article"
            defaultValue={article.body}
            {...register("body", { required: true })}
          />
        </div>
        {errors.body && <span>*This field is required</span>}

        <input type="submit" className="submit-btn" />
      </form>
      <button onClick={() => setShowModal(!showModal)}>Close</button>
    </section>
  );
}

export default EditArticleModal;
