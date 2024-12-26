import React, { Component } from "react";
import CARS from "../../static/cars_img";
import { BiSolidToTop } from "react-icons/bi";

const DEFAULT_IMAGE_URL =
  "https://teja9.kuikr.com/images/car/default-cars.jpeg";

export default class Car extends Component {
  constructor() {
    super();
    this.state = {
      marka: "",
      model: "",
      year: "",
      carType: "",
      fuelType: "",
      desc: "",
      price: "",
      imageId: null,
      editId: null,
      data: JSON.parse(localStorage.getItem("data")) || [],
      showScrollButton: false,
    };
  }

  componentDidMount() {
    window.onscroll = () => {
      if (window.scrollY > 200) {
        this.setState({ showScrollButton: true });
      } else {
        this.setState({ showScrollButton: false }); 
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      localStorage.setItem("data", JSON.stringify(this.state.data));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      marka,
      model,
      year,
      carType,
      fuelType,
      desc,
      price,
      imageId,
      editId,
      data,
    } = this.state;

    if (!marka || !model || !year || !carType || !fuelType || !desc || !price) {
      alert("All fields are required!");
      return;
    }

    if (editId) {
      const updatedData = data.map((item) =>
        item.id === editId
          ? {
              ...item,
              marka,
              model,
              year,
              carType,
              fuelType,
              desc,
              price,
              imageId,
            }
          : item
      );
      this.setState({
        data: updatedData,
        marka: "",
        model: "",
        year: "",
        carType: "",
        fuelType: "",
        desc: "",
        price: "",
        imageId: null,
        editId: null,
      });
    } else {
      const newCar = {
        id: Date.now(),
        marka,
        model,
        year,
        carType,
        fuelType,
        desc,
        price,
        imageId,
      };
      this.setState({
        data: [...data, newCar],
        marka: "",
        model: "",
        year: "",
        carType: "",
        fuelType: "",
        desc: "",
        price: "",
        imageId: null,
      });
    }
  };

  handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      const filteredData = this.state.data.filter((item) => item.id !== id);
      this.setState({ data: filteredData });
    }
  };

  handleEdit = (id) => {
    const carToEdit = this.state.data.find((item) => item.id === id);
    this.setState({
      marka: carToEdit.marka,
      model: carToEdit.model,
      year: carToEdit.year,
      carType: carToEdit.carType,
      fuelType: carToEdit.fuelType,
      desc: carToEdit.desc,
      price: carToEdit.price,
      imageId: carToEdit.imageId,
      editId: id,
    });
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  render() {
    return (
      <div className="min-h-screen bg-[#caf0f8]">
        <header className="bg-[#0077b6] text-white p-4 shadow-md">
          <h1 className="text-center text-2xl font-bold">Car Management</h1>
        </header>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-80 bg-[#0077b6] h-auto p-5 shadow-md top-0 flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-3 text-center">
              Create Car
            </h2>
            <form
              onSubmit={this.handleSubmit}
              className="space-y-4 flex-1 flex flex-col"
            >
              <input
                value={this.state.marka}
                onChange={(e) => this.setState({ marka: e.target.value })}
                className="w-full h-10 p-2 border rounded-lg shadow-sm focus:outline-[#03045e]"
                placeholder="Marka"
                type="text"
              />
              <input
                value={this.state.model}
                onChange={(e) => this.setState({ model: e.target.value })}
                className="w-full h-10 p-2 border rounded-lg shadow-sm focus:outline-[#03045e]"
                placeholder="Model"
                type="text"
              />
              <input
                value={this.state.year}
                onChange={(e) => this.setState({ year: e.target.value })}
                className="w-full h-10 p-2 border rounded-lg shadow-sm focus:outline-[#03045e]"
                placeholder="Year"
                type="number"
              />
              <select
                value={this.state.carType || ""}
                onChange={(e) => this.setState({ carType: e.target.value })}
                className="w-full h-10 p-2 border rounded-lg shadow-sm focus:outline-[#03045e]"
              >
                <option value="" disabled>
                  Select Car Type
                </option>
                <option value="mechanic">Mechanic</option>
                <option value="automatic">Automatic</option>
              </select>
              <select
                value={this.state.fuelType || ""}
                onChange={(e) => this.setState({ fuelType: e.target.value })}
                className="w-full h-10 p-2 border rounded-lg shadow-sm focus:outline-[#03045e]"
              >
                <option value="" disabled>
                  Select Fuel Type
                </option>
                <option value="gaz">Gaz</option>
                <option value="benzin">Benzin</option>
                <option value="electric">Electric</option>
              </select>
              <textarea
                value={this.state.desc}
                onChange={(e) => this.setState({ desc: e.target.value })}
                className="w-full h-20 p-2 border rounded-lg shadow-sm focus:outline-[#03045e]"
                placeholder="Description"
              ></textarea>
              <input
                value={this.state.price}
                onChange={(e) => this.setState({ price: e.target.value })}
                className="w-full h-10 p-2 border rounded-lg shadow-sm focus:outline-[#03045e]"
                placeholder="Price"
                type="number"
              />
              <select
                value={this.state.imageId || ""}
                onChange={(e) => this.setState({ imageId: e.target.value })}
                className="w-full h-10 p-2 border rounded-lg shadow-sm focus:outline-[#03045e]"
              >
                <option value="" disabled>
                  Select Image
                </option>
                {CARS.map((image) => (
                  <option key={image.id} value={image.id}>
                    {image.title}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full h-10 bg-[#0096c7] border-[1px] border-[#266181] text-white font-medium rounded-lg hover:bg-[#03045e] mt-4"
              >
                {this.state.editId ? "Update Car" : "Add Car"}
              </button>
            </form>
          </div>

          <div className="flex-1 p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {this.state.data.map((car) => {
              const carImage = CARS.find(
                (image) => image.id === parseInt(car.imageId)
              );
              const imageUrl = carImage ? carImage.url : DEFAULT_IMAGE_URL;

              return (
                <div
                  key={car.id}
                  className="bg-[#ade8f4] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col max-h-[500px]"
                >
                  <div className="w-full h-80 bg-gray-200 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={`Car ${car.marka} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {car.marka} {car.model}
                      </h3>
                      <p className="text-gray-700 font-medium">
                        Year:{" "}
                        <span className="text-gray-600 mt-2 truncate">
                          {car.year}
                        </span>
                      </p>
                      <p className="text-gray-700 font-medium">
                        Type:{" "}
                        <span className="text-gray-600 mt-2 truncate">
                          {car.carType}
                        </span>
                      </p>
                      <p className="text-gray-700 font-medium">
                        Fuel:{" "}
                        <span className="text-gray-600 mt-2 truncate">
                          {car.fuelType}
                        </span>
                      </p>
                      <p className="text-gray-700 font-medium">
                        Price:{" "}
                        <span className="text-gray-600 mt-2 truncate">
                          {car.price}$
                        </span>
                      </p>
                      <p className="text-gray-600 truncate">
                        <span>{car.desc}</span>
                      </p>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => this.handleDelete(car.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => this.handleEdit(car.id)}
                        className="bg-[#4361ee] text-white px-4 py-2 rounded-lg hover:bg-[#3f37c9]"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {this.state.showScrollButton && (
          <button
            onClick={this.scrollToTop}
            className="fixed bottom-6 right-6  bg-blue-500 text-white p-5 rounded-full shadow-lg hover:bg-blue-600"
          >
            <BiSolidToTop />
          </button>
        )}
      </div>
    );
  }
}
