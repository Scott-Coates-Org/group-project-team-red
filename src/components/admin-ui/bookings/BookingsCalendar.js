import * as React from 'react'
import {
  TimelineViews,
  TimelineMonth,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
} from '@syncfusion/ej2-react-schedule'

const RoomCalendar = () => {
  const ownerData = [
    {
      text: 'Little Room',
      id: 1,
      color: '#ea7a57',
      capacity: 25,
      type: 'Trampoline',
    },
    {
      text: 'Big Room',
      id: 2,
      color: '#7fa900',
      capacity: 50,
      type: 'Trampoline',
    },
    // { text: "Nestle", id: 3, color: "#5978ee", capacity: 5, type: "Cabin" },
    // {
    //   text: "Phoenix",
    //   id: 4,
    //   color: "#fec200",
    //   capacity: 15,
    //   type: "Conference",
    // },
    // {
    //   text: "Mission",
    //   id: 5,
    //   color: "#df5286",
    //   capacity: 25,
    //   type: "Conference",
    // },
    // { text: "Hangout", id: 6, color: "#00bdae", capacity: 10, type: "Cabin" },
    // {
    //   text: "Rick Roll",
    //   id: 7,
    //   color: "#865fcf",
    //   capacity: 20,
    //   type: "Conference",
    // },
    // { text: "Rainbow", id: 8, color: "#1aaa55", capacity: 8, type: "Cabin" },
    // {
    //   text: "Swarm",
    //   id: 9,
    //   color: "#df5286",
    //   capacity: 30,
    //   type: "Conference",
    // },
    // {
    //   text: "Photogenic",
    //   id: 10,
    //   color: "#710193",
    //   capacity: 25,
    //   type: "Conference",
    // },
  ]

  const roomData = [
    {
      Id: 1,
      Subject: 'Junior Jumpers',
      Description: 'Booking',
      StartTime: '2022-07-11T15:30:00.000',
      EndTime: '2022-07-11T16:30:00.000',
      RoomId: 1,
    },
    {
      Id: 2,
      Subject: 'Jump Time',
      Description: 'Booking',
      StartTime: '2022-07-11T07:30:00.000',
      EndTime: '2022-07-11T09:30:00.000',
      RoomId: 2,
    },
  ]

  const getRoomName = (value) => {
    return value.resourceData[value.resource.textField]
  }
  const getRoomType = (value) => {
    return value.resourceData.type
  }
  const getRoomCapacity = (value) => {
    return value.resourceData.capacity
  }
  const resourceHeaderTemplate = (props) => {
    return (
      <div className="template-wrap">
        <div className="room-name">{getRoomName(props)}</div>
        <div className="room-type">{getRoomType(props)}</div>
        <div className="room-capacity">{getRoomCapacity(props)}</div>
      </div>
    )
  }
  const onRenderCell = (args) => {
    if (
      args.elementType === 'emptyCells' &&
      args.element.classList.contains('e-resource-left-td')
    ) {
      let target = args.element.querySelector('.e-resource-text')
      target.innerHTML =
        '<div class="name">Rooms</div><div class="type">Type</div><div class="capacity">Capacity</div>'
    }
  }

  return (
    <ScheduleComponent
      width="100%"
      height="50%"
      selectedDate={new Date()}
      currentView="TimelineWeek"
      resourceHeaderTemplate={resourceHeaderTemplate}
      eventSettings={{ dataSource: roomData }}
      renderCell={onRenderCell}
      group={{ resources: ['MeetingRoom'] }}
      rowAutoHeight={true}
    >
      <ResourcesDirective>
        <ResourceDirective
          field="RoomId"
          title="Room Type"
          name="MeetingRoom"
          dataSource={ownerData}
          textField="text"
          idField="id"
          colorField="color"
        ></ResourceDirective>
      </ResourcesDirective>
      <ViewsDirective>
        <ViewDirective option="TimelineDay" />
        <ViewDirective option="TimelineWeek" />
        <ViewDirective option="TimelineMonth" />
      </ViewsDirective>
      <Inject services={[TimelineViews, TimelineMonth]} />
    </ScheduleComponent>
  )
}

export default RoomCalendar
