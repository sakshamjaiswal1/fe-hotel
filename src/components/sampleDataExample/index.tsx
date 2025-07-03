import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSampleData } from "../../redux/sampleData/action";
import {
  selectSampleData,
  selectSampleDataLoading,
  selectSampleDataError,
  selectHotelDetails,
} from "../../redux/sampleData/selectors";

const SampleDataExample: React.FC = () => {
  const dispatch = useDispatch();
  const sampleData = useSelector(selectSampleData);
  const loading = useSelector(selectSampleDataLoading);
  const error = useSelector(selectSampleDataError);
  const hotelDetails = useSelector(selectHotelDetails);

  useEffect(() => {
    // Load sample data on component mount
    dispatch(loadSampleData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading sample data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!sampleData) {
    return <div>No sample data available</div>;
  }

  return (
    <div className="sample-data-container">
      <h2>Sample Data Example</h2>

      <div className="hotel-info">
        <h3>Hotel Information</h3>
        <p>
          <strong>Name:</strong> {hotelDetails?.name}
        </p>
        <p>
          <strong>Display Name:</strong> {hotelDetails?.display_name}
        </p>
        <p>
          <strong>City:</strong> {hotelDetails?.address.city}
        </p>
        <p>
          <strong>Country:</strong> {hotelDetails?.address.country}
        </p>
        <p>
          <strong>Star Rating:</strong> {hotelDetails?.properties.star_rating}
        </p>
        <p>
          <strong>Budget:</strong> {hotelDetails?.properties.budget}
        </p>
      </div>

      <div className="price-info">
        <h3>Price Information</h3>
        <p>
          <strong>Total Price:</strong> {hotelDetails?.price_info.total_price}{" "}
          {hotelDetails?.price_info.unit}
        </p>
        <p>
          <strong>Discounted Price:</strong>{" "}
          {hotelDetails?.price_info.discounted_price}{" "}
          {hotelDetails?.price_info.unit}
        </p>
        <p>
          <strong>Discount Available:</strong>{" "}
          {hotelDetails?.price_info.is_discount_present ? "Yes" : "No"}
        </p>
      </div>

      <div className="location-info">
        <h3>Location</h3>
        <p>
          <strong>Latitude:</strong> {hotelDetails?.location.latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {hotelDetails?.location.longitude}
        </p>
        <p>
          <strong>Google Place ID:</strong> {hotelDetails?.google_place_id}
        </p>
      </div>

      <div className="additional-info">
        <h3>Additional Information</h3>
        <p>
          <strong>Availability ID:</strong> {sampleData.avail_id}
        </p>
        <p>
          <strong>Vendor ID:</strong> {hotelDetails?.vendor_id}
        </p>
        <p>
          <strong>Action Text:</strong> {hotelDetails?.action_text}
        </p>
      </div>
    </div>
  );
};

export default SampleDataExample;
