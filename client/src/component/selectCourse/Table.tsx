function Table(props: any) {
  const { data, aTagLink, children } = props;
  return (
    <table className="table table-bordered container">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">{children} Count</th>
          <th scope="col">Select</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d: any) => (
          <tr key={d._id}>
            <th scope="row">{d.index}</th>
            <td>{d.name}</td>
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
  );
}

export default Table;
