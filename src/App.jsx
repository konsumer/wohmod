import { useState } from 'react'
import cx from 'classnames'
import INI from 'ini'
import exampleEvent from './examples/event.ito?raw'
import exampleEnemy from './examples/enemy.ito?raw'
import exampleCharacter from './examples/character.ito?raw'
import lists from './lists.json'

const { event } = INI.parse(exampleEvent)
const { enemy } = INI.parse(exampleEnemy)
const { character } = INI.parse(exampleCharacter)

function toTitleCase(text) {
  return text.toLowerCase().replace(
    /(?<!\S)\S/ug, match => match.toUpperCase()
  );
}

console.log(Object.keys(character).map(name => `<InputText name='${name}' label='${toTitleCase(name)}' defaultValue={character.${name}} />`).join('\n'))

function InputText({name, label, ...props}) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} {...props} />
    </div>
  )
}

function InputSelect({name, label, options, ...props}) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <select type="text" name={name} {...props}>
        {options.map((o, i) => (<option key={i}>{o}</option>))}
      </select>
    </div>
  )
}

function App() {
  const [tab, setTab] = useState('event')

  return (
    <>
      <h1>WORLD OF HORROR MOD MAKER</h1>
      
      <div className="tabs">
        <div onClick={() => setTab('event')} className={cx({active: tab === 'event'})}>EVENT</div>
        <div onClick={() => setTab('enemy')} className={cx({active: tab === 'enemy'})}>ENEMY</div>
        <div onClick={() => setTab('character')} className={cx({active: tab === 'character'})}>CHARACTER</div>
        <div onClick={() => setTab('mystery')} className={cx({active: tab === 'mystery'})}>MYSTERY</div>
      </div>
      
      {tab === 'event' && (
        <form className="tab-content">
          <InputText name='name' label='Name' defaultValue={event.name} />
          <InputSelect name='location' label='Location' defaultValue={event.location} options={lists.locations} />
          <InputText name='author' label='Author' defaultValue={event.author} />
          <InputText name='contact' label='Contact' defaultValue={event.contact} />
          <InputText name='flavor' label='Flavor' defaultValue={event.flavor} />
          <InputText name='options' label='Options' defaultValue={event.options} />
          <InputText name='image' label='Image' defaultValue={event.image} />
          <InputText name='about' label='About' defaultValue={event.about} />
          
          <InputText name='optiona' label='Option A' defaultValue={event.optiona} />
          <InputSelect name='testa' label='Test A' defaultValue={event.testa} options={lists.checks} />
          <InputText name='successa' label='Success A' defaultValue={event.successa} />
          <InputText name='winprizea' label='Win Prize A' defaultValue={event.winprizea} />
          <InputText name='winnumbera' label='Win Number A' defaultValue={event.winnumbera} />
          <InputText name='failurea' label='Failure A' defaultValue={event.failurea} />
          <InputText name='failprizea' label='Fail Prize A' defaultValue={event.failprizea} />
          <InputText name='failnumbera' label='Fail Number A' defaultValue={event.failnumbera} />

          <InputText name='optionb' label='Option B' defaultValue={event.optionb} />
          <InputSelect name='testb' label='Test B' defaultValue={event.testb} options={lists.checks} />
          <InputText name='successb' label='Success B' defaultValue={event.successb} />
          <InputText name='winprizeb' label='Win Prize B' defaultValue={event.winprizeb} />
          <InputText name='winnumberb' label='Win Number B' defaultValue={event.winnumberb} />
          <InputText name='failureb' label='Failure B' defaultValue={event.failureb} />
          <InputText name='failprizeb' label='Fail Prize B' defaultValue={event.failprizeb} />
          <InputText name='failnumberb' label='Fail Number B' defaultValue={event.failnumberb} />
          
          <button>SAVE</button>
        </form>
      )}
      {tab === 'enemy' && (
        <form className="tab-content">
          <InputText name='name' label='Name' defaultValue={enemy.name} />
          <InputText name='subtitle' label='Subtitle' defaultValue={enemy.subtitle} />
          <InputText name='type' label='Type' defaultValue={enemy.type} />
          <InputSelect name='location' label='Location' defaultValue={enemy.location} options={lists.locations} />
          <InputText name='author' label='Author' defaultValue={enemy.author} />
          <InputText name='intro' label='Intro' defaultValue={enemy.intro} />
          <InputText name='can_run' label='Can Run?' defaultValue={enemy.can_run} />
          <InputText name='health' label='Health' defaultValue={enemy.health} />
          <InputText name='power' label='Power' defaultValue={enemy.power} />
          <InputText name='damagevalue' label='Damage Value' defaultValue={enemy.damagevalue} />
          <InputText name='damagetype' label='Damage Type' defaultValue={enemy.damagetype} />
          <InputText name='exp' label='Exp' defaultValue={enemy.exp} />
          <InputText name='prize_type' label='Prize Type' defaultValue={enemy.prize_type} />
          <InputText name='prize_name' label='Prize Name' defaultValue={enemy.prize_name} />
          <InputText name='hit01' label='Hit 01' defaultValue={enemy.hit01} />
          <InputText name='hit02' label='Hit 02' defaultValue={enemy.hit02} />
          <InputText name='hit03' label='Hit 03' defaultValue={enemy.hit03} />
          <InputText name='art01' label='Art 01' defaultValue={enemy.art01} />
          <InputText name='art02' label='Art 02' defaultValue={enemy.art02} />
          <InputText name='artfreq' label='Art Frequency' defaultValue={enemy.artfreq} />

          <button>SAVE</button>
        </form>
      )}
      
      {tab === 'character' && (
        <form className="tab-content">
          <InputText name='name' label='Name' defaultValue={character.name} />
          <InputText name='author' label='Author' defaultValue={character.author} />
          <InputText name='contact' label='Contact' defaultValue={character.contact} />
          <InputText name='strength' label='Strength' defaultValue={character.strength} />
          <InputText name='dexterity' label='Dexterity' defaultValue={character.dexterity} />
          <InputText name='perception' label='Perception' defaultValue={character.perception} />
          <InputText name='charisma' label='Charisma' defaultValue={character.charisma} />
          <InputText name='knowledge' label='Knowledge' defaultValue={character.knowledge} />
          <InputText name='luck' label='Luck' defaultValue={character.luck} />
          <InputText name='sprite_icon' label='Sprite Icon' defaultValue={character.sprite_icon} />
          <InputText name='sprite_back' label='Sprite Back' defaultValue={character.sprite_back} />
          <InputText name='sprite_house' label='Sprite House' defaultValue={character.sprite_house} />
          <InputText name='portrait_a' label='Portrait A' defaultValue={character.portrait_a} />
          <InputText name='name_a' label='Name A' defaultValue={character.name_a} />
          <InputText name='portrait_b' label='Portrait B' defaultValue={character.portrait_b} />
          <InputText name='name_b' label='Name Back' defaultValue={character.name_b} />
          <InputText name='menu_tag' label='Menu Tag' defaultValue={character.menu_tag} />
          <InputText name='menu_desc' label='Menu Description' defaultValue={character.menu_desc} />
          <InputText name='perkpack_a' label='Perk Pack A' defaultValue={character.perkpack_a} />
          <InputText name='perkpack_b' label='Perk Pack B' defaultValue={character.perkpack_b} />
          
          <button>SAVE</button>
        </form>
      )}
      
      {tab === 'mystery' && (
        <form className="tab-content">
          <div><strong>TODO</strong>: MYSTERY is a bit more complicated, so I will do it last.</div>

        <button>SAVE</button>
        </form>
      )}
    </>
  )
}

export default App
