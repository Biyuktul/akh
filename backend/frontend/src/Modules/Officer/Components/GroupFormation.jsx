import React from 'react'
import {Select, Divider} from 'antd';

export const GroupFormation = () => {
    
    const items = ["Officer Id", "Officer Name", "Officer Description"];

    const  optionsSelect=[
        {
          id: '00001',
          name: 'Arega Lema',
          description:"Patrol"
          
        },
        {
          id: '00002',
          name: 'Chanyalew Ashagre',
          description:"Patrol"
        },
        {
          id: '00003',
          name: 'Demelash Gebru',
          description:"Patrol"
        },
        {
          id: '00004',
          name: 'Gorfu Sigido',
          description:"Patrol"
        },
        {
          id: '00005',
          name: 'Gemechu Reta',
          description:"Patrol"
        },
        {
          id: '00006',
          name: 'Zeberga Zebarke.',
          description:"Patrol"
        },
        {
          id: '00007',
          name: 'Tayehegn Alebachew',
          description:"Detective"
        }
      ];

      const renderTitle = (header) => (
        <div className='flex w-full  border-b font-bold px-2 mb-2'>
            <table className='flex'>
              <thead>
                  <tr className='flex min-w-[150px]'>
                      {
                        header.map((item, index)=>{
                          return(<div className='flex min-w-[150px]  capitalize max-w-1/5' key={index}>
                            <th className='text-red-600 hover:text-green-500  max-w-1/5 flex '>{item}</th>
                          </div>)
                        })
                      }  
                  </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
        </div>
      );


      const renderItem = (item, length=3) => ({
          value: item.name,
          label: (
            <div class="grid grid-cols-3">
                <div className='w-1/5'>{item.id}</div>  
                <div className='w-1/5'>  {item.name}</div>
                <div className='w-1/5'>  {item.description}</div>
            </div>          
          ),
      });

    const options = [
        {
          label:renderTitle(items) ,
          options: optionsSelect.map((item)=>{
            return  renderItem(item)
          })
          
        },
       
    ];

    const handleSelect = (value) => {
      console.log(value);
    }

    return (
    <>
    <div className='p-10'>
        <Select
            showSearch
            allowClear
            dropdownMatchSelectWidth={500}
            mode='multiple'
            optionLabelProp={"name"}
            autoClearSearchValue
            style={{width: 300}}
            onSelect={handleSelect}
            options={options}
            dropdownRender={menu => (
            <div>
                {menu}
                <Divider style={{ margin: '4px 0' }} />
            <div
            style={{ padding: '4px 8px', cursor: 'pointer' }}
            >
            <div className='flex items-center space-x-3 cursor-pointer '>
            </div>
            </div>
        </div>
        )}
      />
      </div>
    </>
    );
}

export default GroupFormation