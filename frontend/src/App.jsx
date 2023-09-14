import { useState } from 'react'
import './App.css'
import { Drawer,  Button, Placeholder, Pagination, TagPicker,  Table } from 'rsuite';


//table imports
const { Column, HeaderCell, Cell } = Table;
const CompactCell = props => <Cell {...props} style={{ padding: 4 }} />;
const CompactHeaderCell = props => <HeaderCell {...props} style={{ padding: 4 }} />;
import MenuIcon from '@rsuite/icons/Menu';
import 'rsuite/dist/rsuite.min.css';

const limitOptions = [30, 50, 100];
const defaultColumns = [
  {
    key: 'id',
    label: 'Id',
    fixed: true,
    width: 70
  },
  {
    key: 'firstName',
    label: 'First Name',
    fixed: true,
    width: 130
  },
  {
    key: 'lastName',
    label: 'Last Name',
    width: 123
  },

  {
    key: 'gender',
    label: 'Gender',
    width: 200
  },
  {
    key: 'city',
    label: 'City',
    flexGrow: 1
  }
];
function App() {
  // const [count, setCount] = useState(0)
  const [pageSize, setPageSize] = useState(50)
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  //drawer
  const [open, setOpen] = useState(false);

  //pagination
  const [prev, setPrev] = useState(true);
  const [next, setNext] = useState(true);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(true);
  const [ellipsis, setEllipsis] = useState(true);
  const [boundaryLinks, setBoundaryLinks] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [size, setSize] = useState('xs');
  const [maxButtons, setMaxButtons] = useState(5);
  const [total, setTotal] = useState(200);
  const [layout, setLayout] = useState(['total', '-', 'limit', '|', 'pager', 'skip']);
  const [limit, setLimit] = useState(50);

  //table
  const [columnKeys, setColumnKeys] = useState(defaultColumns.map(column => column.key));
  const [loading, setLoading] = useState(false);
  const [compact, setCompact] = useState(true);
  const [bordered, setBordered] = useState(true);
  const [noData, setNoData] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [autoHeight, setAutoHeight] = useState(true);
  const [fillHeight, setFillHeight] = useState(false);
  const [hover, setHover] = useState(true);
  const columns = defaultColumns.filter(column => columnKeys.some(key => key === column.key));
  const CustomCell = compact ? CompactCell : Cell;
  const CustomHeaderCell = compact ? CompactHeaderCell : HeaderCell;
  return (
    <>
      <Button onClick={() => setOpen(true)}><MenuIcon/></Button>
      <Drawer open={open} onClose={() => setOpen(false)} placement='left'>
        <Drawer.Body>
          <Placeholder.Paragraph />
        </Drawer.Body>
      </Drawer>
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className=" padbox">
            <p className="padBoxTextSecondary">TOTAL DOCUMENTS</p>
            <p className="padBoxText">55</p>
          </div>
          <div className="padbox">
          <p className="padBoxTextSecondary">CURRENT PAGE</p>
            <p className="padBoxText">55</p>
          </div>
          <div className=" padbox">
          <p className="padBoxTextSecondary">TOTAL PAGES</p>
            <p className="padBoxText">55</p>
          </div>
        </div>
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
      <hr/>
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
          {columns.map(column => {
            const { key, label, ...rest } = column;
            return (
              <Column {...rest} key={key}>
                <CustomHeaderCell>{label}</CustomHeaderCell>
                <CustomCell dataKey={key} />
              </Column>
            );
          })}
        </Table>
        <hr/>
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
  )
}

export default App
