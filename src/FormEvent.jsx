import { useState, useRef } from 'react'
import TOML from 'toml'

import InputText from './InputText'
import InputSelect from './InputSelect'
import InputTextLong from './InputTextLong'

export default function FormEvent ({ values, onSubmit }) {
  const [optionCount, setOptionCount] = useState(values?.options || 1)
  const [currentVals, setCurrentVals]= useState(values || {})
  const r = useRef()
  
  const handlSubmit = e => {
    e.preventDefault()
    onSubmit(new FormData(e.target))
  }

  const handleLoad = e => {
    e.preventDefault()
    r.current.click()
  }

  const handleFileChange = e => {
    const reader = new FileReader()
    reader.onload = () => {
      const { event } = TOML.parse(reader.result)
      setOptionCount(event.options)
    }

    reader.readAsText(e.target.files[0])
  }

  const letters = 'abc'

  const options = new Array(optionCount).fill(0).map((v,i) => (
    <fieldset key={i} className='border border-white p-2 bg-zinc-900'>
      <legend className='p-2'>{`Option ${letters[i].toUpperCase()}`}</legend>
      <InputText name={`option${letters[i]}`} label='Text' help='What text is displayed for this choice?'/>
      <InputSelect name={`test${letters[i]}`} label='Stat Test' help='Which stat will be checked if player selects this option? Choose store for no-test/auto-success.' options={['story', 'strength', 'dexterity', 'perception', 'knowledge', 'charisma', 'luck']} />
      <hr className='pb-4'/>
      <InputTextLong name={`success${letters[i]}`} label='Success Text' help='Text result of success' />
      <InputSelect name={`winprize${letters[i]}`} label='Success Prize' help='What do you win for success?' options={['stamina', 'reason', 'doom', 'experience', 'funds', 'injury', 'curse', 'ally', 'item']} />
      <InputText name={`winnumber${letters[i]}`} label='Success Amount' help='How much do you win for success?' />
      <hr className='pb-4'/>
      <InputTextLong name={`failure${letters[i]}`} label='Fail Text' help='Text result of failure' />
      <InputSelect name={`failprize${letters[i]}`} label='Fail Prize' help='What do you win for failure?' options={['stamina', 'reason', 'doom', 'experience', 'funds', 'injury', 'curse', 'ally', 'item']} />
      <InputText name={`failnumber${letters[i]}`} label='Fail Amount' help='How much do you win for failure?' />
    </fieldset>
  ))


  return (
    <form className='p-4 bg-black text-white w-11/12 m-auto' onSubmit={handlSubmit}>
      <input ref={r} type="file" className='hidden' onChange={handleFileChange} />
      <h2 className='text-4xl'>Event</h2>
      <InputText name='name' label='Name' help="Event's displayed name"/>
      <InputText name='author' label='Author' help='Visible in the "by <author>" section' />
      <InputText name='contact' label='Contact' help='Not visible, please leave contact to yourself in case I would like to integrate your custom event in the main game.' />
      <InputText name='about' label='About' help='Tiny text explaining the event, seen in the main menu when you hover over it, keep it short.' />
      <InputTextLong name='flavor' label='Flavor' help='The initial text describing the event.' />
      <InputSelect name='location' label='Location' help='Which deck does the event appear in?' options={['downtown', 'school', 'hospital', 'seaside', 'forest', 'mansion', 'village', 'apartment', 'ithotu', 'athyola', 'gozu', 'atorasu']} />
      <InputSelect onChange={e => setOptionCount(parseInt(e.target.value))} value={optionCount} name='options' label='Options' help='How many options are available for the player.' options={["1", "2", "3"]} />
      <div className="flex gap-2 flex-col">
        {options}
      </div>
      <div className="flex gap-2 mt-4">
        <button className='pt-2 px-4 bg-white text-black border-4 border-double'>DOWNLOAD</button>
        <button className='pt-2 px-4 bg-white text-black border-4 border-double' onClick={handleLoad}>LOAD</button>
      </div>
    </form>
    )
}