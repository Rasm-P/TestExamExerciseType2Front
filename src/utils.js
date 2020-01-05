import loginFacade from "./Facade/loginFacade";
import uuid from "uuid/v1";
import React from "react";

export function catchHttpErrors(err) {
  if (err.status) {
    err.fullError.then(e => {
      console.log(e.detail);
      alert(e.message);
    });
  } else {
    console.log("Network error");
  }
}

export function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  } else if (res.status !== 204) {
    return res.json();
  } else {
    return Promise.resolve({ rip: "" });
  }
}

export const makeOptions = (method, addToken, body) => {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    }
  };
  if (addToken && loginFacade.loggedIn()) {
    opts.headers["x-access-token"] = loginFacade.getToken();
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
};

const tableTime = (function() {
  function embeddedTableCreation(info) {
    let filtered = { ...info };
    console.log(filtered);
    filtered = Object.entries(filtered).filter(
      o => !(Object.values(o[1]).length <= 0)
    );
    console.log("filtered+", filtered);

    let restructured = {};

    //filtered.map(arr => {
    //	restructured.push(
    //		Object.assign(Object.values(arr)[0], Object.values(arr)[1])
    //	);
    //});

    filtered.map(arr => {
      restructured[Object.values(arr)[0]] = Object.values(arr)[1];
    });
    console.log("restructured:", restructured);

    let noObjects = Object.entries(restructured).filter(
      o => typeof o[1] !== "object"
    );

    return (
      <div>
        <h3>Person</h3>
        <table className="table">
          <thead>
            <tr>
              {Object.values(noObjects).map(j => (
                <th key={uuid()}>{j[0]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.values(noObjects).map(j => (
                <td key={uuid()}>{j[1]}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <br></br>
        {multiTable2(restructured)}
      </div>
    );
  }

  function multiTable(info) {
    let d = Object.entries({ ...info });
    //console.log(d);
    //Object.values(d).map(o => console.log(o));
    //Object.values(d).map(o => console.log(o[1].length));
    //d = Object.values(d).filter(o => !(o[1].length <= 0));
    //console.log(d);

    let kd = d.filter(o => typeof Object.values(o)[1] === "object");
    let kdr = kd.filter(
      o =>
        typeof Object.values(Object.values(o))[1][Symbol.iterator] !==
        "function"
    );

    return (
      <div>
        {kdr.map(o => (
          <div key={uuid()}>
            <h3>{Object.values(o[0])}</h3>
            <table className="table">
              <thead>
                <tr>
                  {Object.keys(o[1]).map(j => (
                    <th key={uuid()}>{j}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.values(o[1]).map(j => (
                    <td key={uuid()}>{j}</td>
                  ))}
                </tr>
              </tbody>
            </table>
            <br></br>
          </div>
        ))}
      </div>
    );
  }

  function multiTable2(info) {
    let d = Object.entries({ ...info });
    let kd = d.filter(o => typeof Object.values(o)[1] === "object");
    let kdr = kd.filter(
      o =>
        typeof Object.values(Object.values(o))[1][Symbol.iterator] ===
        "function"
    );
    let kdrjl = kdr.map(o => Object.values(Object.values(o)));
    let kdrjll = kdrjl.map(o => Object.values(o)[1]);
    let count = 0;

    return (
      <div>
        {multiTable(info)}
        {kdrjll.map(o => (
          <div key={uuid()}>
            <h3>{Object.values(kdrjl[count++][0])}</h3>

            <table className="table">
              <thead>
                <tr>
                  {Object.keys(Object.values(o)[0]).map(k => (
                    <th key={uuid()}>{k}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.values(o).map(j => (
                  <tr key={uuid()}>
                    {Object.values(j).map(k => (
                      <td key={uuid()}>{k}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <br></br>
          </div>
        ))}
      </div>
    );
  }

  return {
    embeddedTableCreation: embeddedTableCreation,
    multiTable: multiTable,
    multiTable2: multiTable2
  };
})();

export default tableTime;
