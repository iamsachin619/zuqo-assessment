import { useState } from "react";
import "./App.css";
import {
  Drawer,
  Button,
  Placeholder,
  Pagination,
  TagPicker,
  Table,
} from "rsuite";

//table imports
const { Column, HeaderCell, Cell } = Table;
const CompactCell = (props) => <Cell {...props} style={{ padding: 4 }} />;
const CompactHeaderCell = (props) => (
  <HeaderCell {...props} style={{ padding: 4 }} />
);
import "rsuite/dist/rsuite.min.css";
import NavBar from "./components/navBar";
import Analytics from "./components/Analytics";
import { useEffect } from "react";
import apiHost from "../env";

const limitOptions = [30, 50, 100];
const defaultColumns = [
  {
    key: "id",
    label: "Id",
    fixed: true,
    width: 70,
  },
  {
    key: "firstName",
    label: "First Name",
    fixed: true,
    flexGrow: 1,
  },
  {
    key: "lastName",
    label: "Last Name",
    flexGrow: 1,
  },

  {
    key: "gender",
    label: "Gender",
    flexGrow: 1,
  },
  {
    key: "city",
    label: "City",
    flexGrow: 1,
  },
  {
    key: "action",
    label: "Action",
    flexGrow: 1,
  },
];
function App() {
  // const [count, setCount] = useState(0)
  const [pageSize, setPageSize] = useState(50);
  // const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  //drawer

  //pagination
  const [prev, setPrev] = useState(true);
  const [next, setNext] = useState(true);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(true);
  const [ellipsis, setEllipsis] = useState(true);
  const [boundaryLinks, setBoundaryLinks] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [size, setSize] = useState("xs");
  const [maxButtons, setMaxButtons] = useState(5);
  const [total, setTotal] = useState(200);
  const [totalPages, setTotalPages] = useState(2)
  const [layout, setLayout] = useState([
    "total",
    "-",
    "limit",
    "|",
    "pager",
    "skip",
  ]);
  const [limit, setLimit] = useState(30);

  //table
  const [columnKeys, setColumnKeys] = useState(
    defaultColumns.map((column) => column.key)
  );
  const [loading, setLoading] = useState(true);
  const [compact, setCompact] = useState(true);
  const [bordered, setBordered] = useState(true);
  const [noData, setNoData] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [autoHeight, setAutoHeight] = useState(true);
  const [fillHeight, setFillHeight] = useState(false);
  const [hover, setHover] = useState(true);
  const columns = defaultColumns.filter((column) =>
    columnKeys.some((key) => key === column.key)
  );
  const CustomCell = compact ? CompactCell : Cell;
  const CustomHeaderCell = compact ? CompactHeaderCell : HeaderCell;

  const errorHandler = (e) =>{

  }
  const addIdAndDeleteFunctionToData = (data, currentPage,limit) =>{
    let startId
    startId = ((currentPage -1) * limit) +1
    let dataToReturn = data.map(row => {
      row.id = startId
      row.action = <button onClick={(e)=>{
        deleteUser(row._id)
      }}>Delete</button>
      startId += 1
      return row
    })
    return dataToReturn;
  }

  const setApiData = (data) =>{
    setActivePage(data.currentPage)
    setTotal(data.totalUsers)
    setTotalPages(data.totalPages)
    let dataToSet = addIdAndDeleteFunctionToData(data.users, data.currentPage, limit)
    setData(dataToSet)
    setLoading(false)
  }
  const getUsers = async () =>{
    await fetch(apiHost + 'api/users'+ '?pageSize='+limit + '&page='+activePage,{
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
      console.log({data})
      setApiData(data)
    })
    .catch((e)=>{
      errorHandler(e)
    })
    

  }
  const deleteUser = async (_id) =>{
    console.log({_id})
    await fetch(apiHost + 'api/users/'+_id ,{
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(()=>{
      setLoading(true)
      getUsers()
    })
    .catch((e)=>{
      errorHandler(e)
    })
  }
  // useEffect(()=>{
  //   getUsers()
  // },[])

  useEffect(()=>{
    getUsers()
  },[limit,activePage])
  return (
    <>
      <NavBar />
      <div className="container">
        <Analytics currentPage={activePage} total={total} totalPages={totalPages}/>
        <div className="mainTable">
          Columns：
          <TagPicker
            data={defaultColumns}
            labelKey="label"
            valueKey="key"
            value={columnKeys}
            onChange={setColumnKeys}
            cleanable={false}
          />
          <hr />
          <Table
            loading={loading}
            height={300}
            hover={hover}
            fillHeight={fillHeight}
            showHeader={showHeader}
            autoHeight={autoHeight}
            data={noData ? [] : data}
            bordered={bordered}
            cellBordered={bordered}
            headerHeight={compact ? 30 : 40}
            rowHeight={compact ? 30 : 46}
          >
            {columns.map((column) => {
              const { key, label, ...rest } = column;
              return (
                <Column {...rest} key={key}>
                  <CustomHeaderCell>{label}</CustomHeaderCell>
                  <CustomCell dataKey={key} />
                </Column>
              );
            })}
          </Table>
          <hr />
          <Pagination
            layout={layout}
            size={size}
            prev={prev}
            next={next}
            first={first}
            last={last}
            ellipsis={ellipsis}
            boundaryLinks={boundaryLinks}
            total={total}
            limit={limit}
            limitOptions={limitOptions}
            maxButtons={maxButtons}
            activePage={activePage}
            onChangePage={setActivePage}
            onChangeLimit={setLimit}
          />
        </div>
      </div>
    </>
  );
}

export default App;
