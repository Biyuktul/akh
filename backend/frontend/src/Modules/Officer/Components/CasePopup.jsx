import { Modal, Table, Button } from 'antd';

const CaseDetailModal = ({ visible, handleCancel, case_info, offense, defendant, officer, selectedRowData  }) => {

  const handleExport = () => {
    //do some operation
  }
  return (
        <Modal
        title="Case Detail"
        visible={visible}
        onCancel={handleCancel}
        style={{ maxWidth: '100%', minWidth: '70%' }}
        footer={[
          <Button key="export" type="primary" onClick={handleExport} style={{backgroundColor: '#1677ff'}}>
            Export
          </Button>,
        ]}
      >
        <div 
                style={{
                        display: 'grid', 
                        gridTemplateAreas: `
                                'case-info defendant-info'
                                'offense-info case-handler'
                        `,
                        justifyContent: 'space-around'
                        }}
        >
        
        {selectedRowData && (
          <>
          <div style={{gridArea: 'case-info'}}>
           <h1  style={{width: 300, display: 'inline-block'}} className='font-bold text-2xl text-red-500'>Case information </h1>
           <Table
            style={{width: 300}}
            dataSource={case_info.map((c) => ({
              key: c.id,
              title: 'Offense Type: ' + c.type,
              details: [
                { key: 'type', label: 'Case Type', value: c.type },
                { key: 'date', label: 'Case Date', value: c.date },
                { key: 'location', label: 'Case Location', value: c.location },
                { key: 'description', label: 'Case Description', value: c.descritpion },
                { key: 'comp_name', label: 'Complainant Full Name', value: c.complainant_name },
                { key: 'comp_phone', label: 'Complainant Phone', value: c.complainant_phone },
                { key: 'comp_address', label: 'Complainant Address', value: c.complainant_address },
                { key: 'comp_statment', label: 'Complainant Statment', value: c.complainant_statment },
                { key: 'sus_name', label: 'Suspect Name', value: c.suspect_name },
                { key: 'sus_address', label: 'Suspect Address', value: c.suspect_address },
                { key: 'sus_description', label: 'Suspect Description', value: c.suspect_description },
                { key: 'witt_name', label: 'Witness Name', value: c.witness_name },
                { key: 'witt_address', label: 'Witness Address ', value: c.wittness_address },
                { key: 'witt_statment', label: 'Witness Statment', value: c.witness_statment },
                { key: 'status', label: 'Case Status', value: c.status },
              ],
            }))}
            columns={[
              {
                dataIndex: 'title',
                render: (text, record) => (
                  <>
                    <div>{text}</div>
                    {record.details.map((detail) => (
                      <div key={detail.key}>
                        <strong>{detail.label}: </strong>
                        {detail.value}
                      </div>
                    ))}
                  </>
                ),
              },
            ]}
            pagination={false}
            size="small"
          />
          </div>

          <div style={{gridArea: 'offense-info'}}>
          <h1  style={{width: 300, display: 'inline-block'}} className='font-bold text-2xl text-red-500'>Offence information </h1>
          <Table
           style={{width: 300}}
            dataSource={offense.map((o) => ({
              key: o.id,
              title: 'Offense Type: ' + o.type,
              details: [
                { key: 'date', label: 'Offense Date', value: o.date },
                { key: 'location', label: 'Offense Location', value: o.location },
                { key: 'description', label: 'Offense Description', value: o.description },
              ],
            }))}
            columns={[
              {
                dataIndex: 'title',
                render: (text, record) => (
                  <>
                    <div>{text}</div>
                    {record.details.map((detail) => (
                      <div key={detail.key}>
                        <strong>{detail.label}: </strong>
                        {detail.value}
                      </div>
                    ))}
                  </>
                ),
              },
            ]}
            pagination={false}
            size="small"
          />
          </div>

          <div style={{gridArea: 'defendant-info'}}>
          <h1  style={{width: 300, display: 'inline-block'}} className='font-bold text-2xl text-red-500'>Defendant information </h1>
          <Table
           style={{width: 300}}
            dataSource={defendant.map((d) => ({
              key: d.id,
              details: [
                { key: 'name', label: 'Defendant Name', value: d.name },
                { key: 'age', label: 'Defendant Age', value: d.age },
                { key: 'gender', label: 'Defendant Gender', value: d.gender },
                { key: 'address', label: 'Defendant Address', value: d.address },
                { key: 'phone', label: 'Defendant Phone', value: d.phone },
                { key: 'history', label: 'Defendant Crime History', value: d.criminal_history },
                { key: 'date', label: 'Defendant Court Date', value: d.court_date },
                { key: 'verdict', label: 'Defendant Verdict', value: d.verdict },
              ],
            }))}
            columns={[
              {
                dataIndex: 'title',
                render: (text, record) => (
                  <>
                    <div>{text}</div>
                    {record.details.map((detail) => (
                      <div key={detail.key}>
                        <strong>{detail.label}: </strong>
                        {detail.value}
                      </div>
                    ))}
                  </>
                ),
              },
            ]}
            pagination={false}
            size="small"
          />
          </div>

          <div style={{gridArea: 'case-handler'}}>
          <h1 style={{width: 300, display: 'inline-block'}} className='font-bold text-2xl text-red-500'>Case Handling Officers information </h1>
          <Table
            style={{width: 300}}
            dataSource={officer.map((o) => ({
              key: o.id,
              details: [
                { key: 'id', label: 'Team Id', value: o.team_id },
                { key: 'leader', label: 'Team Leader', value: o.team_leader },
                { key: 't-inspector', label: 'Technichal Inspector', value: o.technical_inspector },
                { key: 'b-inspector', label: 'Body Related Inspector', value: o.body_related_inspector },
                { key: 'p-inspector', label: 'Property Related Inspector', value: o.property_related_inspector },
                { key: 'patrols', label: 'Number Of Patrols', value: o.number_of_patrols },
              ],
            }))}
            columns={[
              {
                dataIndex: 'title',
                render: (text, record) => (
                  <>
                    <div>{text}</div>
                    {record.details.map((detail) => (
                      <div key={detail.key}>
                        <strong>{detail.label}: </strong>
                        {detail.value}
                      </div>
                    ))}
                  </>
                ),
              },
            ]}
            pagination={false}
            size="small"
          />
          </div>
          </>
        )}
        </div>
      </Modal>
  )
}

export default CaseDetailModal;