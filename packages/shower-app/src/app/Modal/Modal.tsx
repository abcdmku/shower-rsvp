import { Alert, Button, ButtonGroup, Form, Stack } from "react-bootstrap";
import '../Template2/Template2.css';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ictpfgjcsmfkspnaqmqc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljdHBmZ2pjc21ma3NwbmFxbXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNTc1NDMsImV4cCI6MjAwNTgzMzU0M30.knSLXzRjuUGJbKgkNcSFj1hmGc-FfPl8hVzIzB-CZNA'
const supabase = createClient(supabaseUrl, supabaseKey)

export function ModalForm() {
  const [attending, setAttending] = useState(false);
  const [message, setMessage] = useState<string>();
  const [submitted, setSubmitted] = useState<object>();
  const { register, handleSubmit, formState: {isSubmitting} } = useForm();

  const onSubmit = async formData => {
    const { data, error } = await supabase
      .from('Shower')
      .insert([formData])
      .select()
    data && setSubmitted(data[0])
    error && (setMessage(error.message))
  }

  return (submitted ? <div className="dusty-rose-light p-3 rounded-2">Thanks for filling out the RSVP!</div> :
    <Form className="dusty-rose-light p-3 rounded-2" onSubmit={handleSubmit(onSubmit)}>
      {message && <Alert variant="danger" className='py-2'>Error submitting form: {message}</Alert>}
      <Stack gap={4}>
        <Form.Group controlId="name" className='mx-1'>
          <Form.Label className="mb-0">Name*</Form.Label>
          <Form.Control type="Name" placeholder="Enter Name" required {...register("name")}/>
          <Form.Text className="text-muted">
            No need to list all the names of your party.
          </Form.Text>
        </Form.Group>

        <div className="btn-group dusty-rose-text" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" className="btn-check" id="btnradio1" {...register("attending")} value={'true'} onClick={e => setAttending(true)} required/>
          <label className="btn btn-outline-primary w-50" htmlFor="btnradio1">Attending!</label>

          <input type="radio" className="btn-check" id="btnradio2" {...register("attending")} value={'false'} onClick={e => setAttending(false)} required/>
          <label className="btn btn-outline-primary w-50" htmlFor="btnradio2">Sorry can't make it.</label>
        </div>

        <div style={{maxHeight: attending ? '100px': '0px', transition: 'all 500ms', overflowY: 'hidden'}}>
          <Form.Group controlId="children" className='mx-1'>
            <Form.Label className="mb-1">How many others will be attending with your party?</Form.Label>
            <Form.Control type="number" defaultValue={0} {...register("children")}/>
          </Form.Group>
        </div>

        <button type="submit" className="btn mx-auto dusty-rose-btn" disabled={isSubmitting}>
          Submit
        </button>
      </Stack>
    </Form>
  );
}

export default ModalForm;
