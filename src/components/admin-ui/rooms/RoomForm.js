import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { createRoom, fetchAllRooms, savePhoto } from 'redux/room'

export default function RoomForm() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, // subscribe to errors
  } = useForm()

  // register is a cb func which returns some props and inject into inputs which allow us to validate and control the inputs
  // ref assigns a ref name for the input field, the rest of the register functionality is passed to for e.g. roomRest
  // { required: true, minLength: 4} validation object
  // {required: 'This is required'} pass a custom error message
  // useForm({defaultValues: { firstName: "bill"}}) define default values
  // useForm({watch}) subscribe to the form input and see what's going on. watch("firstName") subscribe to firstName only
  const { ref: nameRef, ...nameRest } = register('name', { required: true })
  const { ref: capacityRef, ...capacityRest } = register('capacity', { required: true })
  const { ref: photoRef, ...photoRest } = register('photo', { required: true })

  const onSubmit = (data) => {
    if (Object.keys(errors).length) {
      alert('Error saving room: ' + JSON.stringify(errors))
    } else {
      dispatch(savePhoto({ file: data.photo[0] })).then((action) => {
        const photoUrl = action.payload
        if (photoUrl) {
          dispatch(
            createRoom({
              name: data.name,
              capacity: data.capacity,
              photo: photoUrl,
            })
          ).then(() => {
            reset()
            dispatch(fetchAllRooms())
          })
        }
      })
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="p-3 my-3 border border-primary"
    >
      <FormGroup>
        <Label for="name">Room Name</Label>
        <Input
          id="name"
          type="text"
          {...nameRest}
          innerRef={nameRef}
          invalid={errors.name}
        />
      </FormGroup>
      <FormGroup>
        <Label for="room">Room Capacity</Label>
        <Input
          id="capacity"
          type="text"
          {...capacityRest}
          innerRef={capacityRef}
          invalid={errors.capacity}
        />
      </FormGroup>
      <FormGroup>
        <Label for="photo">Room Photo</Label>
        <Input
          id="photo"
          type="file"
          accept="image/*"
          {...photoRest}
          innerRef={photoRef}
          invalid={errors.photo}
        />
      </FormGroup>
      <Button type="submit" color="primary">
        Create Room
      </Button>
    </Form>
  )
}
