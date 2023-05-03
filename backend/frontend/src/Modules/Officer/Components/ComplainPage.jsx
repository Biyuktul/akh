import ComplaintList from "./ComplainTable"
const data = [
        {
          key: '1',
          complainant: 'John Doe',
          complaint: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          status: 'Pending',
        },
        {
          key: '2',
          complainant: 'Jane Smith',
          complaint: 'Praesent euismod nisi et tortor consectetur sollicitudin.',
          status: 'Pending',
        },
        // Add more data as needed
      ];

      
const ComplainPage = () => {
  return (
    <div>
      <ComplaintList data={data}/>
    </div>
  )
}

export default ComplainPage
