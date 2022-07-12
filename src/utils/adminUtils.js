import moment from 'moment'

// const rooms = [
//   {
//     name: 'bigRoom',
//     maxCapacity: 50,
//     price: 20,
//   },
//   {
//     name: 'smallRoom',
//     maxCapacity: 25,
//     price: 20,
//   },
// ]

const createTimeSlots = (fromTime, toTime) => {
  let startTime = moment(fromTime, 'HH:mm')
  let endTime = moment(toTime, 'HH:mm')

  let arr = []
  while (startTime <= endTime) {
    arr.push(new moment(startTime).format('HH:mm'))

    startTime.add(30, 'minutes')
  }
  return arr
}

const createDays = (fromDay, toDay) => {
  let startDay = moment(fromDay, 'MM-DD-YYYY')
  let endDay = moment(toDay, 'MM-DD-YYYY')
  let arr = []

  while (startDay <= endDay) {
    arr.push(new moment(startDay).format('MM-DD-YYYY'))

    startDay.add(1, 'day')
  }
  return arr
}

export const createDateObjs = (fromDay, toDay, arrayOfRoomObjs) => {
  const daysArr = createDays(fromDay, toDay)
  let dayObjsArray = []
  daysArr.forEach((day) => {
    let dayObj = {}
    dayObj = {
      id: day,
    }
    arrayOfRoomObjs.forEach((room) => {
      dayObj[room.name] = {
        ...room,
        timeSlots: createTimeSlots('10:00', '19:00'),
      }
    })

    dayObjsArray.push(dayObj)
  })
  return dayObjsArray
}

// const dateObjects = createDateObjs('07-09-2022', '07-19-2022', rooms)

// export const _createDateObjects = async (dateObjsToPost) => {
//   for (let dateObj of dateObjsToPost) {
//     const docRef = await db.collection('dates').doc(dateObj.id)

//     docRef
//       .get()
//       .then(async (doc) => {
//         if (!doc.exists) {
//           await firebase.collection('dates').doc(dateObj.id).set(dateObj)
//         }
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }
// }

// _createDateObjects(dateObjects)
