import isLoged from "../../utils/isLoged";
import { useState } from "react";
import SeeDetails from "./SeeClassDetails";

function Table(props: any) {
  const { data, type, aTagLink, children } = props;
  const [show, setShow] = useState(false);
  const [dataToShow, setDataToShow] = useState<any>(null);

  function showdetails(event: any) {
    const id = event.target.getAttribute("data-show");

    const dataToShow = data.find((d: any) => d._id === id);
    if (dataToShow) {
      setDataToShow(dataToShow);
      setShow(true);
    }
  }

  return (
    <>
      {show && (
        <SeeDetails
          dataToShow={dataToShow}
          setShow={setShow}
          type={type.toLowerCase()}
          key={dataToShow._id}
        />
      )}
      <div className="tableDiv">
        <table className="table table-bordered container">
          <thead className="stickyTableHead">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              {isLoged() && <th scope="col">See details</th>}
              <th scope="col">{children} Count</th>
              <th scope="col">Select</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d: any) => (
              <tr key={d._id}>
                <th scope="row">{d.index}</th>
                <td
                  onClick={() => (window.location.href = aTagLink + d._id)}
                  style={{ cursor: "pointer" }}
                >
                  {d.name}
                </td>
                {isLoged() && (
                  <td>
                    <span
                      className="seeDetailsBtn"
                      data-show={d._id}
                      onClick={showdetails}
                    >
                      See details
                    </span>
                  </td>
                )}
                <td>
                  <p>{d[`${children.toLowerCase()}_count`]}</p>
                </td>
                <td>
                  <a
                    href={`${aTagLink}${encodeURIComponent(d._id)}`} //ID & PATH
                  >
                    <button type="button" className="btn btn-outline-primary">
                      Select
                    </button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
