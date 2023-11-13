import { useState, useEffect, useRef } from 'react'
import cx from 'classnames'

import examplesText from './examples.ito?raw'
import * as ITO from './ito'

const examples = ITO.parse(examplesText)

const letters = 'abc'

export default function App () {
  const [tab, setTab] = useState('event')
  const [event, setEvent] = useState(examples.event)
  const [options, setOptions] = useState([])
  const [modalContent, setModalContent] = useState('author')
  const [currentOption, setCurrentOption] = useState(0)
  const modal = useRef()

  // this turns flat events into array
  // after this, use options for all the option-stuff
  useEffect(() => {
    const o = new Array(parseInt(event?.options || 1)).fill(0).map((v, i) => {
      return {
        option: event[`option${letters[i]}`] || '',
        success: event[`success${letters[i]}`] || '',
        failure: event[`failure${letters[i]}`] || '',
        test: event[`test${letters[i]}`] || '',
        winnumber: parseInt(event[`winnumber${letters[i]}`] || '0'),
        winprize: event[`winprize${letters[i]}`] || '',
        failnumber: parseInt(event[`failnumber${letters[i]}`] || '0'),
        failprize: event[`failprize${letters[i]}`] || ''
      }
    })
    setOptions(o)
  }, [event])

  const addOption = e => {
    e.preventDefault()
    const o = [...options, {
      option: 'do something',
      success: 'whatever you did, it worked out.',
      failure: 'whatever you did, it did not work out.',
      test: 'story',
      winprize: '',
      winnumber: 0,
      failprize: '',
      failnumber: 0
    }]
    setOptions(o)
    showOptionModal(o.length - 1)()
  }

  const removeOption = index => e => {
    e?.preventDefault()
    e?.stopPropagation()
    if (options.length > 1){
      const o = options.filter((v,i) => i != index)
      setOptions(o)
    }
  }

  const showModal = name => {
    setModalContent(name)
    modal.current.showModal()
  }

  const showAuthorModal = e => {
    e?.preventDefault()
    showModal('author')
  }

  const showEventModal = e => {
    e?.preventDefault()
    showModal('event')
  }
  
  const showOptionModal = i => e => {
    e?.preventDefault()
    setCurrentOption(i)
    showModal('option')
  }

  const updateOption = field => e => {
    e?.preventDefault()
    const o = [...options]
    o[currentOption][field] = e.target.value

    if (name.includes('prize') && e.target.value === 'item') {
      o[currentOption][field.replace('prize', 'number')] = ''
    }

    setOptions(o)
  }

  return (
    <div className="m-4">
      <dialog id="my_modal_1" className="modal" ref={modal}>
        <div className={cx('modal-box', {'w-11/12 max-w-5xl': modalContent === 'option' })}>
          {modalContent === 'author' && (
            <>
              <h3 className="font-bold text-lg">Author</h3>
              <p className="py-4">Here you can tell people you made this!</p>
              <div>
                <label className="label">
                  <span className="label-text">Author</span>
                </label>
                <input type="text" placeholder="Unknown Author" className="input input-bordered w-full max-w-xs" value={event.author} onChange={e=>setEvent({...event, author: e.target.value})} />
                <label className="label">
                  <span className="label-text-alt">Visible in the "by &lt;author&gt;" section.</span>
                </label>

                <label className="label">
                  <span className="label-text">Contact</span>
                </label>
                <input type="text" placeholder="Contact" className="input input-bordered w-full max-w-xs" value={event.contact} onChange={e=>setEvent({...event, contact: e.target.value})} />
                <label className="label">
                  <span className="label-text-alt">Not visible, please leave contact to yourself in case panstasz would like to integrate your custom event in the main game.</span>
                </label>
              </div>
            </>
          )}
          
          {modalContent === 'event' && (
            <>
              <h3 className="font-bold text-lg">{event.name || 'Unknown Event'}</h3>
              <p className="py-4"></p>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="Unknown Event" className="input input-bordered w-full max-w-xs" value={event.name} onChange={e=>setEvent({...event, name: e.target.value})} />
              <label className="label">
                <span className="label-text-alt">The name of the event.</span>
              </label>

              <label className="label">
                <span className="label-text">About</span>
              </label>
              <input type="text" placeholder="About" className="input input-bordered w-full max-w-xs" value={event.about} onChange={e=>setEvent({...event, about: e.target.value})} />
              <label className="label">
                <span className="label-text-alt">Tiny text explaining the event, seen in the main menu when you hover over it (keep it short.)</span>
              </label>

              <label className="label">
                <span className="label-text">Flavor</span>
              </label>
              <textarea className="textarea textarea-bordered w-full" placeholder="Flavor" value={event.flavor} onChange={e=>setEvent({...event, flavor: e.target.value})} />
              <label className="label">
                <span className="label-text-alt">Text the user sees when this event happens.</span>
              </label>

              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <select className="select select-bordered w-full max-w-xs" value={event.location} onChange={e=>setEvent({...event, location: e.target.value})}>
                <option>downtown</option>
                <option>school</option>
                <option>hospital</option>
                <option>seaside</option>
                <option>forest</option>
                <option>mansion</option>
                <option>village</option>
                <option>apartment</option>
                <option>ithotu</option>
                <option>athyola</option>
                <option>gozu</option>
                <option>atorasu</option>
              </select>
              <label className="label">
                <span className="label-text-alt">Where does this event happen?</span>
              </label>
            </>
          )}

          {modalContent === 'option' && !!options[currentOption] && (
            <>
              <h3 className="font-bold text-lg">{options[currentOption].option || 'do something'}</h3>

              <label className="label">
                <span className="label-text">Option Text</span>
              </label>
              <input type="text" placeholder="do something" className="input input-bordered w-full max-w-xs" value={options[currentOption].option} onChange={updateOption('option')} />
              <label className="label">
                <span className="label-text-alt">The text shown for this option.</span>
              </label>

              <label className="label">
                <span className="label-text">Test</span>
              </label>
              <select className="select select-bordered w-full max-w-xs" value={options[currentOption].test} onChange={updateOption('test')} >
                <option>strength</option>
                <option>dexterity</option>
                <option>perception</option>
                <option>knowledge</option>
                <option>charisma</option>
                <option>luck</option>
                <option>story</option>
                <option>funds1</option>
                <option>funds2</option>
              </select>
              <label className="label">
                <span className="label-text-alt">Which stat will be checked if player selects this option? Set to "story" for no test (auto-success.)</span>
              </label>

              <div className="flex gap-2">
                <fieldset className='border p-2 w-1/2'>
                  <legend>SUCCESS</legend>
                  <label className="label">
                    <span className="label-text">Text</span>
                  </label>
                  <textarea className="textarea textarea-bordered w-full" placeholder="success!" value={options[currentOption].success} onChange={updateOption('success')} />
                  <label className="label">
                    <span className="label-text-alt">The text shown if the test succeeds.</span>
                  </label>

                  <label className="label">
                    <span className="label-text">Prize</span>
                  </label>
                  <div className="flex gap-2">
                    {!['injury', 'curse', 'ally', 'item'].includes(options[currentOption].winprize) && (
                      <input type="number" placeholder="do something" className="input input-bordered w-full max-w-xs" value={options[currentOption].winnumber} onChange={updateOption('winnumber')} />
                    )}
                    <select className="select select-bordered w-full max-w-xs" value={options[currentOption].winprize} onChange={updateOption('winprize')} >
                      <option>stamina</option>
                      <option>reason</option>
                      <option>doom</option>
                      <option>experience</option>
                      <option>funds</option>
                      <option>injury</option>
                      <option>curse</option>
                      <option>ally</option>
                      <option>item</option>
                    </select>
                    {options[currentOption].winprize === 'item' && (
                      <input type="text" placeholder="STEAK KNIFE" className="input input-bordered w-full max-w-xs" value={options[currentOption].winnumber} onChange={updateOption('winnumber')} />
                    )}
                  </div>
                  <label className="label">
                    <span className="label-text-alt">The prize if the test succeeds.</span>
                  </label>
                </fieldset>
                <fieldset className='border p-2 w-1/2'>
                  <legend>FAILURE</legend>
                  <label className="label">
                    <span className="label-text">Text</span>
                  </label>
                  <textarea className="textarea textarea-bordered" placeholder="you failed!" className="input input-bordered w-full max-w-xs" value={options[currentOption].failure} onChange={updateOption('failure')} />
                  <label className="label">
                    <span className="label-text-alt">The text shown if the test fails.</span>
                  </label>

                  <label className="label">
                    <span className="label-text">Prize</span>
                  </label>
                  <div className="flex gap-2">
                    <input type="number" placeholder="do something" className="input input-bordered w-full max-w-xs" value={options[currentOption].failnumber} onChange={updateOption('failnumber')} />
                    <select className="select select-bordered w-full max-w-xs" value={options[currentOption].failprize} onChange={updateOption('failprize')} >
                      <option>stamina</option>
                      <option>reason</option>
                      <option>doom</option>
                      <option>experience</option>
                      <option>funds</option>
                      <option>injury</option>
                      <option>curse</option>
                      <option>ally</option>
                      <option>item</option>
                    </select>
                  </div>
                  <label className="label">
                    <span className="label-text-alt">The prize if the test fails.</span>
                  </label>
                </fieldset>
              </div>
            </>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <ul className="timeline timeline-vertical">
        <button onClick={showAuthorModal} className='btn mb-2'>Author: {event.author || 'Unknown Author'}{event.contact ? ` (${event.contact})` : ''}</button>
        <li>
          <button onClick={showEventModal} className="timeline-start timeline-box btn">{event.name || 'Unkown Event'}</button>
          <hr/>
          <button onClick={addOption} className="timeline-end btn btn-circle btn-xs btn-success" disabled={options.length > 2}>+</button>
          <hr/>
        </li>
        {options.map((o,i) => (
          <li key={i}>
            <hr/>
            <div onClick={showOptionModal(i)} className="timeline-end timeline-box btn">
              {o.option || 'Do Nothing'}
              <button className="btn btn-circle btn-xs btn-error" disabled={options.length === 1} onClick={removeOption(i)}>-</button>
            </div>
            <hr/>
          </li>
        ))}
      </ul>
      <div className='flex gap-2 justify-center mt-2'>
        <button className="btn btn-primary">Save</button>
        <button className="btn btn-secondary">Load</button>
      </div>
    </div>
  )
}