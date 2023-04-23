import React, { useState } from "react";
import { Button, Card, TextField } from "@material-ui/core";
import { DatePicker, Space } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
const { RangePicker } = DatePicker;
const AddTestForm = () => {
  const [testValues, setTestValues] = useState({
    title: "",
    range: [],
    link: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTestValues({ ...testValues, [name]: value });
  };

  const handleRangeChange = (value) => {
    setTestValues({ ...testValues, range: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:8080/api/v1/admin/create-test", testValues)
      .then((res) => {
        toast.success(res.data.message);
      });
  };
  return (
    <>
      <Card className="col-md-11 col-12 mx-auto p-3 card_box_shadow">
        <form onSubmit={handleSubmit}>
          <h4 style={{color:'black'}} className='text-center my-2 header_css'>Add Test Form</h4>
          <TextField
            variant="outlined"
            label="Test Title"
            className="col-12 my-3"
            required
            name="title"
            value={testValues.title}
            onChange={handleInputChange}
          />
          <Space size={12} className="col-12 my-3">
            <RangePicker
              showTime
              onChange={handleRangeChange}
              value={testValues.range}
            />
          </Space>
          <TextField
            type="url"
            variant="outlined"
            label="Test Link"
            className="col-12 my-3"
            required
            name="link"
            value={testValues.link}
            onChange={handleInputChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Create Test
          </Button>
        </form>
      </Card>
    </>
  );
};

export default AddTestForm;
