import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../shared/components/FormComponents/Input";
import Button from "../../shared/components/FormComponents/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormComponents/ImageUpload";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceForm.css";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const navigate = useNavigate();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest("http://localhost:5000/api/places", "POST", formData, {
        Authorization: "Bearer " + auth.token,
      });
      navigate("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;

// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";

// import Input from "../../shared/components/FormComponents/Input";
// import Button from "../../shared/components/FormComponents/Button";
// import ErrorModal from "../../shared/components/UIElements/ErrorModal";
// import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
// import {
//   VALIDATOR_REQUIRE,
//   VALIDATOR_MINLENGTH,
// } from "../../shared/util/validators";
// import { useForm } from "../../shared/hooks/form-hook";
// import { useHttpClient } from "../../shared/hooks/http-hook";
// import { AuthContext } from "../../shared/context/auth-context";
// import "./PlaceForm.css";
// import ImageUpload from "../../shared/components/FormComponents/ImageUpload";

// const NewPlace = () => {
//   const auth = useContext(AuthContext);
//   const { isLoading, error, sendRequest, clearError } = useHttpClient();
//   const [formState, inputHandler] = useForm(
//     {
//       title: {
//         value: "",
//         isValid: false,
//       },
//       description: {
//         value: "",
//         isValid: false,
//       },
//       address: {
//         value: "",
//         isValid: false,
//       },
//       image: {
//         value: null,
//         isValid: false,
//       },
//     },
//     false
//   );

//   const navigate = useNavigate();

//   const placeSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("title", formState.inputs.title.value);
//       formData.append("description", formState.inputs.description.value);
//       formData.append("address", formState.inputs.address.value);
//       formData.append("creator", auth.userId);
//       formData.append("image", formState.inputs.image.value);
//       await sendRequest("http://localhost:5000/api/places", "POST", formData);
//       navigate("/");
//     } catch (err) {}
//   };

//   return (
//     <React.Fragment>
//       <ErrorModal error={error} onClear={clearError} />
//       <form className="place-form" onSubmit={placeSubmitHandler}>
//         {isLoading && <LoadingSpinner asOverlay />}
//         <Input
//           id="title"
//           element="input"
//           type="text"
//           label="Title"
//           validators={[VALIDATOR_REQUIRE()]}
//           errorText="Please enter a valid title."
//           onInput={inputHandler}
//         />
//         <Input
//           id="description"
//           element="textarea"
//           label="Description"
//           validators={[VALIDATOR_MINLENGTH(5)]}
//           errorText="Please enter a valid description (at least 5 characters)."
//           onInput={inputHandler}
//         />
//         <Input
//           id="address"
//           element="input"
//           label="Address"
//           validators={[VALIDATOR_REQUIRE()]}
//           errorText="Please enter a valid address."
//           onInput={inputHandler}
//         />
//         <ImageUpload
//           id="image"
//           onInput={inputHandler}
//           errorText="Please provide am image."
//         />
//         <Button type="submit" disabled={!formState.isValid}>
//           ADD PLACE
//         </Button>
//       </form>
//     </React.Fragment>
//   );
// };

// export default NewPlace;

// // import React, { useContext } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./PlaceForm.css";
// // import Input from "../../shared/components/FormComponents/Input";
// // import {
// //   VALIDATOR_MINLENGTH,
// //   VALIDATOR_REQUIRE,
// // } from "../../shared/util/validators";

// // import Button from "../../shared/components/FormComponents/Button";
// // import { AuthContext } from "../../shared/context/auth-context";
// // import { useForm } from "../../shared/hooks/form-hook";
// // import { useHttpClient } from "../../shared/hooks/http-hook";
// // import ErrorModal from "../../shared/components/UIElements/ErrorModal";
// // import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

// // const NewPlace = () => {
// //   const auth = useContext(AuthContext);
// //   const { isLoading, sendRequest, error, clearError } = useHttpClient();
// //   const [formState, inputHandler] = useForm(
// //     {
// //       title: {
// //         value: "",
// //         isValid: false,
// //       },
// //       description: {
// //         value: "",
// //         isValid: false,
// //       },
// //       address: {
// //         value: "",
// //         isValid: false,
// //       },
// //     },
// //     false
// //   );

// //   const navigate = useNavigate();

// //   const placeSubmitHandler = async (event) => {
// //     event.preventDefault();
// //     try {
// //       await sendRequest(
// //         "http://localhost:5000/api/places",
// //         "POST",
// //         JSON.stringify({
// //           title: formState.inputs.title.value,
// //           description: formState.inputs.description.value,
// //           address: formState.inputs.address.value,
// //           creator: auth.userId,
// //         }),
// //         { "Content-Type": "application/json" }
// //       );
// //       // Redirect the user to a different page
// //       navigate("/");
// //     } catch (err) {}
// //   };

// //   return (
// //     <React.Fragment>
// //       <ErrorModal error={error} onClear={clearError} />
// //       <form className="place-form" onSubmit={placeSubmitHandler}>
// //         {isLoading && <LoadingSpinner asOverlay />}
// //         <Input
// //           id="title"
// //           element="input"
// //           type="text"
// //           label="Title"
// //           validators={[VALIDATOR_REQUIRE()]}
// //           errorText="Please enter a valid title"
// //           onInput={inputHandler}
// //         />

// //         <Input
// //           id="description"
// //           element="textarea"
// //           label="Description"
// //           validators={[VALIDATOR_MINLENGTH(5)]}
// //           errorText="Please enter a valid description (at least 5 characters)"
// //           onInput={inputHandler}
// //         />

// //         <Input
// //           id="address"
// //           element="input"
// //           label="Address"
// //           validators={[VALIDATOR_REQUIRE()]}
// //           errorText="Please enter a valid address."
// //           onInput={inputHandler}
// //         />
// //         <Button type="submit" disabled={!formState.isValid}>
// //           ADD PLACE
// //         </Button>
// //       </form>
// //     </React.Fragment>
// //   );
// // };
// // export default NewPlace;
