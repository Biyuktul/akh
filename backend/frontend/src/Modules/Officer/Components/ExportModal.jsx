import { Modal, Checkbox } from 'antd';

const ExportModal = ({ columns, visible, onCancel, onExport }) => {
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleColumnSelect = (column) => {
    setSelectedColumns((prevSelectedColumns) => {
      if (prevSelectedColumns.includes(column)) {
        return prevSelectedColumns.filter((col) => col !== column);
      } else {
        return [...prevSelectedColumns, column];
      }
    });
  };

  const handleExport = () => {
    onExport(selectedColumns);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onOk={handleExport}
    >
      <p>Select columns to export:</p>
      {columns.map((column) => (
        <Checkbox
          key={column.key}
          checked={selectedColumns.includes(column)}
          onChange={() => handleColumnSelect(column)}
        >
          {column.title}
        </Checkbox>
      ))}
    </Modal>
  );
};

export default ExportModal;