
import { loadFormData, saveFormData } from '../utils/storage'
import { AttendeeDetails, Ready, TicketSelection } from '../components/multi-step-form'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

type Props = {}

const steps = [{
  id: 1,
  title: 'Ticket Selection',
}, {
  id: 2,
  title: 'Attendee Details',
}, {
  id: 3,
  title: 'Ready',
}
]


const Events = (props: Props) => {

  // const [searchParams, setSearchParams] = useSearchParams()

  const [currentStep, setCurrentStep] = useState<any>(1)
  //Number(searchParams.get('step'))
  const initialFormData = {
    ticketType: "",
    ticketCount: 1,
    image: "",
    name: "",
    email: "",
    request: ""
  }
  const [formData, setFormData] = useState(() => {
    const savedData = loadFormData();
    return { ...initialFormData, ...savedData };
  })
  useEffect(() => {
    if (currentStep > 3) {
      // setSearchParams({ step: 1 })
      return
    }
    // setSearchParams({ step: currentStep })



  }, [currentStep,])

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }))
    saveFormData({ ...formData, ...newData })
    console.log(formData)
  }

  const handleNext = () => {

    if (currentStep < steps.length) {
      // setSearchParams({ step: String(currentStep + 1) })
      setCurrentStep((prev: number) => prev + 1)
    }
  }

  const handlePrev = () => {

    if (currentStep > 1) {
      // setSearchParams({ step: String(currentStep - 1) })
      setCurrentStep((prev: number) => prev - 1)
    }
  }
  const renderForm = (currentStep: number, handleNext: () => void, handlePrev: () => void, data, updateFormData) => {

    switch (currentStep) {
      case 1:
        return <TicketSelection currentStep={currentStep} handleNext={handleNext} handlePrev={handlePrev} data={data} updateFormData={updateFormData} />
      case 2:
        return <AttendeeDetails currentStep={currentStep} handlePrev={handlePrev} handleNext={handleNext} data={data} updateFormData={updateFormData} />

      case 3:
        return <Ready currentStep={currentStep} handlePrev={handlePrev} data={data} updateFormData={updateFormData} />

      default:
        return <TicketSelection currentStep={currentStep} handlePrev={handlePrev} data={data} updateFormData={updateFormData} handleNext={handleNext} />;
    }
  }
  return (
    <main className='md:flex md:min-h-screen justify-center items-center mt-10'>

      <div className='md:p-12 p-4 /flex flex-col gap-8 justify-center items-center border border-border-green rounded-2xl w-full md:w-[70%]'>

        <StepTitle currentStep={currentStep} />

        <div>

          {renderForm(currentStep, handleNext, handlePrev, formData, updateFormData)}
        </div>
      </div>

    </main>
  )
}

const StepTitle = ({ currentStep }) => {

  return (<div className=''>
    <div className='flex md:justify-between md:items-center flex-col md:flex-row '>

      <h2 className="text-white self-stretch text-xl md:text-2xl lg:text-3xl font-jeju ">{steps[currentStep - 1].title}</h2>
      <p className="text-gray font-roboto">{currentStep}/{steps.length}</p>
    </div>

    <div className='w-full h-0.5 bg-border-green rounded-sm'>

      <div className='h-0.5  bg-primary-green mt-2 rounded-sm' style={{ width: `${(100 / 3) * currentStep}%` }}></div>
    </div>
  </div>)
}

export default Events
