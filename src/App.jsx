import { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import lists from './lists.json'
import templateUrl from './template_event.png'

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
        option: event[`option${letters[i]}`] || 'do something',
        success: event[`success${letters[i]}`] || 'whatever you did, it worked out.',
        failure: event[`failure${letters[i]}`] || 'whatever you did, it did not work out.',
        test: event[`test${letters[i]}`] || 'story',
        winnumber: parseInt(event[`winnumber${letters[i]}`] || '0'),
        winprize: event[`winprize${letters[i]}`] || 'none',
        failnumber: parseInt(event[`failnumber${letters[i]}`] || '0'),
        failprize: event[`failprize${letters[i]}`] || 'none',
        wineffect: event[`wineffect${letters[i]}`] || 'none',
        faileffect: event[`faileffect${letters[i]}`] || 'none'
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
      winprize: 'none',
      winnumber: 0,
      failprize: 'none',
      failnumber: 0,
      wineffect: 'none',
      faileffect: 'none'
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

    if (field.includes('prize')) {
      if (e.target.value === 'item') {
        o[currentOption][field.replace('prize', 'number')] = lists.items[0]
      } else if (e.target.value === 'spell') {
        o[currentOption][field.replace('prize', 'number')] = lists.spells[0]
      } else if (e.target.value === 'itempool') {
        o[currentOption][field.replace('prize', 'number')] = lists.itemPools[0]
      } else {
        o[currentOption][field.replace('prize', 'number')] = 0
      }
    }

    setOptions(o)
  }

  // trigger file-load
  const handleLoad = () => {}

  // turn the current state objects into 
  const handleSave = () => {
    const newEvent = {...event}
    const fields = ['option', 'success', 'failure', 'test', 'winnumber', 'winprize', 'failnumber', 'failprize', 'faileffect', 'wineffect']

    // clean up newlines
    for (const field of Object.keys(newEvent)) {
      newEvent[field] = newEvent[field].replace(/\n/g, '#')
    }

    // clean all old options
    for (const l of letters) {
      for (const f of fields) {
        delete newEvent[`${f}${l}`]
      }
    }
    for (const i in options) {
      const l = letters[i]
      for (const f of fields) {
        newEvent[`${f}${l}`] = options[i][f].toString()
      }
    }

    newEvent.options = options.length.toString()

    const blob = new Blob([ITO.stringify({event: newEvent})], { type: 'text/plain' })
    const a = document.createElement('a')
    a.setAttribute('download', `${newEvent.name.replace(/ /g, '_').replace(/[.+=;:!,<>?/\\]/g, '')}.ito`)
    a.setAttribute('href', window.URL.createObjectURL(blob))
    a.click()
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
                <span className="label-text">Image</span>
              </label>
              <input type="text" placeholder="example art/policeman_seaside.png" className="input input-bordered w-full max-w-xs" value={event.image} onChange={e=>setEvent({...event, image: e.target.value})} />
              <label className="label">
                <span className="label-text-alt">The image to use. You can use <a className='text-primary' href={templateUrl}>this template</a> for size &amp; color.</span>
              </label>

              <label className="label">
                <span className="label-text">Wavy</span>
              </label>
              <div className="flex gap-2 items-center">
                <input type="checkbox" className="toggle" checked={event.wavy_art === "1"} onClick={e => setEvent({...event, wavy_art: e.target.checked ? "1" : "0"})} />
                {event.wavy_art === "1" && (
                  <input className="input input-bordered w-full max-w-xs" type="number" value={event.wavy_speed || 0} onChange={e=>setEvent({...event, wavy_speed: e.target.value})} />
                )}
              </div>
              <label className="label">
                <span className="label-text-alt">Make the image all wavy.</span>
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
                {lists.locations.map(o => <option key={o}>{o}</option>)}
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
                {lists.checks.map(o => <option key={o}>{o}</option>)}
              </select>
              <label className="label">
                <span className="label-text-alt">Which stat will be checked if player selects this option? Set to "story" for no test (auto-success.)</span>
              </label>

              <div className="flex gap-2">
                <fieldset className={cx('border p-2', {'w-1/2': options[currentOption].test !== 'story', 'w-full': options[currentOption].test === 'story'})}>
                  <legend>SUCCESS</legend>
                  <label className="label">
                    <span className="label-text">Text</span>
                  </label>
                  <textarea className="textarea textarea-bordered w-full" placeholder="success!" value={options[currentOption].success} onChange={updateOption('success')} />
                  <label className="label">
                    <span className="label-text-alt">The text shown if the test succeeds.</span>
                  </label>

                  <label className="label">
                    <span className="label-text">Effect</span>
                  </label>
                  <select className="select select-bordered w-full max-w-xs" value={options[currentOption].wineffect} onChange={updateOption('wineffect')} >
                    {lists.visualEffects.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <label className="label">
                    <span className="label-text-alt">The visual-effect shown on success.</span>
                  </label>

                  <label className="label">
                    <span className="label-text">Prize</span>
                  </label>
                  <div className="flex gap-2">
                    {!['injury', 'curse', 'ally', 'item', 'none', 'spell', 'itempool'].includes(options[currentOption].winprize) && (
                      <input type="number" className="input input-bordered w-full max-w-xs" value={options[currentOption].winnumber} onChange={updateOption('winnumber')} />
                    )}
                    <select className="select select-bordered w-full max-w-xs" value={options[currentOption].winprize} onChange={updateOption('winprize')} >
                      {lists.rewards.map(o => <option key={o}>{o}</option>)}
                    </select>
                    {options[currentOption].winprize === 'item' && (
                      <select className="select select-bordered w-full max-w-xs" value={options[currentOption].winnumber} onChange={updateOption('winnumber')} >
                        {lists.items.map(o => <option key={o}>{o}</option>)}
                      </select>
                    )}
                    {options[currentOption].winprize === 'spell' && (
                      <select className="select select-bordered w-full max-w-xs" value={options[currentOption].winnumber} onChange={updateOption('winnumber')} >
                        {lists.spells.map(o => <option key={o}>{o}</option>)}
                      </select>
                    )}
                    {options[currentOption].winprize === 'itempool' && (
                      <select className="select select-bordered w-full max-w-xs" value={options[currentOption].winnumber} onChange={updateOption('winnumber')} >
                        {lists.itemPools.map(o => <option key={o}>{o}</option>)}
                      </select>
                    )}
                  </div>
                  <label className="label">
                    <span className="label-text-alt">The prize if the test succeeds.</span>
                  </label>
                </fieldset>

                {options[currentOption].test !== 'story' && (
                  <fieldset className='border p-2 w-1/2'>
                    <legend>FAIL</legend>
                    <label className="label">
                      <span className="label-text">Text</span>
                    </label>
                    <textarea className="textarea textarea-bordered w-full" placeholder="success!" value={options[currentOption].failure} onChange={updateOption('failure')} />
                    <label className="label">
                      <span className="label-text-alt">The text shown if the test fails.</span>
                    </label>

                  <label className="label">
                    <span className="label-text">Effect</span>
                  </label>
                  <select className="select select-bordered w-full max-w-xs" value={options[currentOption].faileffect} onChange={updateOption('faileffect')} >
                    {lists.visualEffects.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <label className="label">
                    <span className="label-text-alt">The visual-effect shown on fail.</span>
                  </label>

                    <label className="label">
                      <span className="label-text">Prize</span>
                    </label>
                    <div className="flex gap-2">
                      {!['injury', 'curse', 'ally', 'item', 'none', 'spell', 'itempool'].includes(options[currentOption].failprize) && (
                        <input type="number" className="input input-bordered w-full max-w-xs" value={options[currentOption].failnumber} onChange={updateOption('failnumber')} />
                      )}
                      <select className="select select-bordered w-full max-w-xs" value={options[currentOption].failprize} onChange={updateOption('failprize')} >
                        {lists.rewards.map(o => <option key={o}>{o}</option>)}
                      </select>
                      {options[currentOption].failprize === 'item' && (
                        <select className="select select-bordered w-full max-w-xs" value={options[currentOption].failnumber} onChange={updateOption('failnumber')} >
                          {lists.items.map(o => <option key={o}>{o}</option>)}
                        </select>
                      )}
                      {options[currentOption].failprize === 'spell' && (
                        <select className="select select-bordered w-full max-w-xs" value={options[currentOption].failnumber} onChange={updateOption('failnumber')} >
                          {lists.spells.map(o => <option key={o}>{o}</option>)}
                        </select>
                      )}
                      {options[currentOption].failprize === 'itempool' && (
                        <select className="select select-bordered w-full max-w-xs" value={options[currentOption].failnumber} onChange={updateOption('failnumber')} >
                          {lists.itemPools.map(o => <option key={o}>{o}</option>)}
                        </select>
                      )}
                    </div>
                    <label className="label">
                      <span className="label-text-alt">The prize if the test succeeds.</span>
                    </label>
                  </fieldset>
                )}
                
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
        <button onClick={handleSave} className="btn btn-primary">Save</button>
        {/* <button onClick={handleLoad} className="btn btn-secondary">Load</button> */}
      </div>
    </div>
  )
}