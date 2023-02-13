import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';
import EditBtnCellRenderer from './components/EditButtonRenderer';
import DeleteBtnCellRenderer from './components/DeleteButtonRenderer';
import { Person } from './components/types/types';
import 'react-table-6/react-table.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import PersonForm from './components/PersonForm';

const Table = ({ tableType }: { tableType: string }) => {
  const [data, setData] = useState<Person[]>([]);
  const [type, setType] = useState<string>(tableType);
  const [showForm, setShowForm] = useState(false);
  const [idS, setIdS] = useState<string>('');
  const [editPerson, setEditPerson] = useState<Person>();

  const handleEdit = (editData: Person) => {
    // eslint-disable-next-line no-underscore-dangle
    console.log('Table handleEdit: ', editData._id);
    setEditPerson(editData);
    // eslint-disable-next-line no-underscore-dangle
    setIdS(editData._id);
    console.log('Table handleEdit: ', showForm);
    setShowForm(!showForm);
    console.log('Table handleEdit: ', editData.Type);
    // add the editData to the form
    // eslint-disable-next-line no-underscore-dangle
  };

  const adjustData = (aData: Person, dataType: string) => {
    console.log('adjustData: ', aData);
    const newData = aData.map((item: Person) => {
      item.Type = dataType;
      return item;
    });
    console.log('newData: ', newData);
    return newData;
  };

  const personCallback = (idString: string, tType: string) => {
    console.log('personCallback: ', idString, tType);
  };

  function ResetData(tab: string) {
    axios
      .get(`http://localhost:3001/api/${tab}`)
      // eslint-disable-next-line promise/always-return
      .then((res) => {
        console.log('res.data: ', res.data);
        setData(adjustData(res.data));
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  }

  const components = useMemo(() => {
    return {
      buttonRenderer: Button,
    };
  }, []);

  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);

  const handleDelete = (pData: Person) => {
    // eslint-disable-next-line no-underscore-dangle
    console.log('handleDelete: ', pData._id);
    console.log('tableType: ', pData.Type);
    axios
      .post(`http://localhost:3001/api/delete/${data.Type}/${pData._id}`)
      // eslint-disable-next-line promise/always-return
      .then((res) => {
        console.log('res: ', res);
        console.log('data: ', pData);
        // eslint-disable-next-line promise/always-return
        if (res.status !== 200) return;
        ResetData(pData.Type);
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  };

  const [columnDefs] = useState([
    {
      headerName: 'Edit',
      field: 'Edit',
      cellRenderer: EditBtnCellRenderer,
      cellRendererParams: {
        clicked(userData: Person) {
          handleEdit(userData);
        },
      },
    },
    {
      headerName: 'Delete',
      field: 'Delete',
      cellRenderer: DeleteBtnCellRenderer,
      cellRendererParams: {
        clicked(userData: Person) {
          handleDelete(userData);
        },
      },
    },
    { field: 'Name' },
    { field: 'Address' },
    { field: 'City' },
    { field: 'State' },
    { field: 'Zip' },
    { field: 'HomePhone' },
    { field: 'CellPhone' },
    { field: 'Email' },
    { field: 'Notes' },
  ]);

  useEffect(() => {
    if (tableType === '') return;
    console.log('Changed tableType: ', tableType);
    setType(tableType);
    const fetchData = async () => {
      const result = await axios(`http://localhost:3001/api/${tableType}`);
      console.log('result: ', result.data);
      setData(adjustData(result.data, tableType));
      setType(tableType);
    };
    fetchData();
  }, [tableType]);

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          defaultColDef={defaultColDef}
          rowData={data}
          components={components}
          columnDefs={columnDefs}
        />
      </div>
      <PersonForm
        showForm={showForm}
        editPerson={editPerson}
        onOptionsUpdate={personCallback}
      />
    </div>
  );
};

export default Table;
