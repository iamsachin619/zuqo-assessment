import React from "react";

function Analytics({currentPage, total, totalPages}) {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className=" padbox">
          <p className="padBoxTextSecondary">TOTAL DOCUMENTS</p>
          <p className="padBoxText">{total}</p>
        </div>
        <div className="padbox">
          <p className="padBoxTextSecondary">CURRENT PAGE</p>
          <p className="padBoxText">{currentPage}</p>
        </div>
        <div className=" padbox">
          <p className="padBoxTextSecondary">TOTAL PAGES</p>
          <p className="padBoxText">{totalPages}</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
