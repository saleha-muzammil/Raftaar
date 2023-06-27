import { useState } from 'react';
import '../App.css';
import { Field, Formik, Form } from 'formik';

function SGPACalc() {

  const [GPA, setGPA] = useState(0.0);
  const [fields, setFields] = useState([]);

  const handleSubmit = ({grades, credits}) =>
  {
    console.log(grades, credits);
    let numerator = 0, denominator = 0;
    for (let i = 0; i < grades.length; i++)
    {
      numerator += grades[i] * credits[i];
      denominator += parseInt(credits[i]);
    }

    console.log(numerator);
    console.log(denominator);
    setGPA((numerator/denominator).toFixed(2));
  }

  const addField = (values, setFieldValue) =>
  {
    const {grades, credits} = values; 
    setFields([...fields, fields.length]);
    setFieldValue('grades', [...grades, 0]);
    setFieldValue('credits', [...credits, 0]);
  }

  const removeField = (f, values, setFieldValue) =>
  {
    const {credits, grades} = values;
    setFields(fields.length === 1 ? [] : [...fields.slice(0, f), ...fields.slice(f + 1, fields.length)]);
    const newCredits = fields.length === 1 ? [] : [...credits.slice(0, f), ...credits.slice(f + 1, fields.length)];
    const newGrades = fields.length === 1 ? [] : [...grades.slice(0, f), ...grades.slice(f + 1, fields.length)];
    setFieldValue('grades', newGrades, true);
    setFieldValue('credits', newCredits, true);
  }

  return (
    <div className="App-header text-gray-200">
      <mark className = "text-gray-200 bg-zinc-600 px-2 py-1 rounded-md">SGPA - {GPA}</mark>
      <br />
      <Formik onSubmit = {handleSubmit} initialValues={{grades: [], credits:[]}}>
        {({values, setFieldValue}) => <Form>
            <button type = "button" onClick = {()=> addField(values, setFieldValue)} className='bg-neutral-600 px-2 py-1 rounded-sm my-5'>Add Field</button>
            {fields.map(f => <section key = {f} className='space-x-2'>
                <Field
                as="input"
                type="text"
                name={`textbox[${f}]`}
                className="text-gray-200 bg-gray-700 rounded-sm my-2 py-1 focus:outline-0 px-1"
                placeholder="Course"
                />
                <Field as = "select" defaultValue = {0} name = {`credits[${f}]`} className="text-gray-200 bg-gray-700 rounded-sm my-2 py-1 focus:outline-0 px-1">
                  <option value = {0} disabled >Credits</option>
                  <option value = {1}>1</option>
                  <option value = {2}>2</option>
                  <option value = {3}>3</option>
                </Field>  
                <Field as = "select" defaultValue = {0}  name = {`grades[${f}]`} className="text-gray-200 bg-gray-700 rounded-sm my-2 py-1 focus:outline-0">
                  <option value = {0} disabled >Grade</option>
                  <option value = {4}>A+/A</option>
                  <option value = {3.666667}>A-</option>
                  <option value = {3.333333}>B+</option>
                  <option value = {3}>B</option>
                  <option value = {2.666667}>B-</option>
                  <option value = {2.333333}>C+</option>
                  <option value = {2}>C</option>
                  <option value = {1.666667}>C-</option>
                  <option value = {1.333333}>D+</option>
                  <option value = {1}>D-</option>
                  <option value = {0}>F</option>                  
                </Field>
                <button type = "button" className='bg-slate-600 px-2 py-1.5 text-sm rounded-sm' onClick={(option)=>removeField(f, values, setFieldValue)}>Remove</button>
              </section>)
            }
            <button type = "submit" className='my-2 block bg-neutral-600 px-2 py-1 rounded-sm'>Get SGPA</button>
          </Form>
        }
        </Formik>
    </div>
  );
}

export default SGPACalc;