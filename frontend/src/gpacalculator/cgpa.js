import { useState } from 'react';
import '../App.css';
import { Field, Formik, Form } from 'formik';

function CGPACalc() {

  const [GPA, setGPA] = useState(0.0);
  const [GPA0, setGPA0]= useState(0.0);
  const [fields, setFields] = useState([]);


  const handleSubmit0 = ({sgpa, cgpa, newcredits, prevcredits}) =>
  {
    console.log(sgpa, newcredits);
    let newgpa = (sgpa* newcredits) + (cgpa*prevcredits) ;
    newgpa/= (newcredits + prevcredits);

    setGPA0((newgpa).toFixed(2));
  }

  const handleSubmit = ({sgpa, credits}) =>
  {
    
    console.log(sgpa, credits);
    let numerator = 0.0, denominator = 0.0;
    for (let i = 0; i < sgpa.length; i++)
    {
      numerator += sgpa[i] * credits[i];
      denominator += parseInt(credits[i]);
    }

    console.log(numerator);
    console.log(denominator);
    setGPA((numerator/denominator).toFixed(2));
  }

  const addField = (values, setFieldValue) =>
  {
    const {sgpa, credits} = values; 
    setFields([...fields, fields.length]);
    setFieldValue('sgpa', [...sgpa, 0]);
    setFieldValue('credits', [...credits, 0]);
  }

  const removeField = (f, values, setFieldValue) =>
  {
    const {credits, sgpa} = values;
    setFields(fields.length === 1 ? [] : [...fields.slice(0, f), ...fields.slice(f + 1, fields.length)]);
    const newCredits = fields.length === 1 ? [] : [...credits.slice(0, f), ...credits.slice(f + 1, fields.length)];
    const newsgpa = fields.length === 1 ? [] : [...sgpa.slice(0, f), ...sgpa.slice(f + 1, fields.length)];
    setFieldValue('sgpa', newsgpa, true);
    setFieldValue('credits', newCredits, true);
  }

  return (
    <div className="App-header text-gray-200">


{/* needs to be edited */}

      {/* <mark className = "text-gray-200 bg-zinc-600 px-2 py-1 rounded-md">CGPA - {GPA0}</mark>
      <br/> */}
      {/* <Formik
  onSubmit={handleSubmit0}
  initialValues={{ sgpa:0.0, cgpa: 0.0, newcredits:0,  prevcredits: 0 }}
>
  {({ values, setFieldValue }) => (
    <Form>
      {fields.map((f) => (
        <section key={f}>
          <input
            type="number"
            name={`cgpa[${f}]`}
            className="text-gray-200 bg-gray-700 rounded-sm my-2 py-1 focus:outline-0 px-1"
            placeholder="Previous CGPA"
            value={values.cgpa[f] || ""}
            onChange={(e) => setFieldValue(`cgpa[${f}]`, e.target.value)}
          />
          <input
            type="number"
            name={`prevcredits[${f}]`}
            className="text-gray-200 bg-gray-700 rounded-sm my-2 py-1 focus:outline-0 px-1"
            placeholder="Previous Credits"
            value={values.prevcredits[f] || ""}
            onChange={(e) => setFieldValue(`prevcredits[${f}]`, e.target.value)}
          />
          <input
            type="number"
            step="0.001"
            name={`sgpa[${f}]`}
            className="text-gray-200 bg-gray-700 rounded-sm my-2 py-1 focus:outline-0 px-1"
            placeholder="SGPA"
            value={values.sgpa[f] || ""}
            onChange={(e) => setFieldValue(`sgpa[${f}]`, e.target.value)}
          />
          <input
            type="number"
            name={`credits[${f}]`}
            className="text-gray-200 bg-gray-700 rounded-sm my-2 py-1 focus:outline-0 px-1"
            placeholder="New Credits"
            value={values.credits[f] || ""}
            onChange={(e) => setFieldValue(`credits[${f}]`, e.target.value)}
          />
        </section>
      ))}
            <button
        type="submit"
        className="my-2 block bg-neutral-600 px-2 py-1 rounded-sm"
      >
        Get CGPA from SGPA .....
      </button>
    </Form>
  )}
</Formik> */}

      <mark className = "text-gray-200 bg-zinc-600 px-2 py-1 rounded-md">CGPA - {GPA}</mark>
      <br />
      <Formik
  onSubmit={handleSubmit}
  initialValues={{ sgpa: [], credits: [] }}
>
  {({ values, setFieldValue }) => (
    <Form>
      <button
        type="button"
        onClick={() => addField(values, setFieldValue)}
        className="bg-neutral-600 px-2 py-1 rounded-sm my-5"
      >
        Add Field
      </button>
      {fields.map((f) => (
        <section key={f} className="space-x-2">
          <input
            type="number"
            step="0.001"
            name={`sgpa[${f}]`}
            className="text-gray-200 bg-gray-700 rounded-sm my-2 py-1 focus:outline-0 px-1"
            placeholder="SGPA"
            value={values.sgpa[f] || ""}
            onChange={(e) => setFieldValue(`sgpa[${f}]`, e.target.value)}
          />
          <input
            type="number"
            name={`credits[${f}]`}
            className="text-gray-200 bg-gray-700 rounded-sm my-2 py-1 focus:outline-0 px-1"
            placeholder="Credits"
            value={values.credits[f] || ""}
            onChange={(e) => setFieldValue(`credits[${f}]`, e.target.value)}
          />
          <button
            type="button"
            className="bg-slate-600 px-2 py-1.5 text-sm rounded-sm"
            onClick={() => removeField(f, values, setFieldValue)}
          >
            Remove
          </button>
        </section>
      ))}
      <button
        type="submit"
        className="my-2 block bg-neutral-600 px-2 py-1 rounded-sm"
      >
        Get CGPA
      </button>
    </Form>
  )}
</Formik>

    </div>
  );
}

export default CGPACalc;