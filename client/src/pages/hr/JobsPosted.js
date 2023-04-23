import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-ui/core";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
const JobsPosted = () => {
  const [alldrives, setAllDrives] = useState([]);

  const [{ user }] = useAuth();
  useEffect(() => {
    const getAllDrives = async () => {
      await axios
        .get(`http://localhost:8080/api/v1/hr/get-all-drives/${user._id}`)
        .then((res) => {
          setAllDrives(res.data.drives);
        });
    };
    getAllDrives();
  }, []);
  return (
    <>
      <h3 className="text-center mb-3 header_css">Job Posted</h3>
      <section className="col-12 d-flex  p-3 flex-wrap justify-content-center">
        {alldrives?.map((drive, index) => {
          return (
            <>
              <Card
                className="col-md-3 col-12 col-sm-5 p-3 my-3 mx-5 m-2 card_box_shadow card_hover_effect text-center"
                style={{
                  position: "relative"}}
                key={index}
              >
                <Link
                  to={`/hr/dashboard/${user._id}/view-applicants/${drive._id}`}
                >
                  <h5 style={{fontFamily:'Libre Baskerville'}}>{drive?.companyName}</h5>
                  <Typography>
                    Drive Date :{new Date(drive?.driveDate).toDateString()}
                  </Typography>
                  <Typography>
                    Posted on : {new Date(drive?.postedAt).toDateString()}
                  </Typography>
                  <Typography>
                    No of Applicants :
                    {drive?.applicants?.length > 0
                      ? drive?.applicants?.length
                      : 0}
                  </Typography>
                </Link>
              </Card>
            </>
          );
        })}
      </section>
    </>
  );
};

export default JobsPosted;
