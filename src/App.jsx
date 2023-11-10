import { useState } from 'react'
import cx from 'classnames'
import INI from 'ini'
import exampleEvent from './examples/event.ito?raw'
import exampleEnemy from './examples/enemy.ito?raw'
import exampleCharacter from './examples/character.ito?raw'

const { event } = INI.parse(exampleEvent)
const { enemy } = INI.parse(exampleEnemy)
const { character } = INI.parse(exampleCharacter)

function toTitleCase(text) {
  return text.toLowerCase().replace(
    /(?<!\S)\S/ug, match => match.toUpperCase()
  );
}

console.log(Object.keys(character).map(name => `<InputText name='${name}' label='${toTitleCase(name)}' placeholder={character.${name}} />`).join('\n'))

function InputText({name, label, ...props}) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} {...props} />
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
          <InputText name='name' label='Name' placeholder={event.name} />
          <InputText name='location' label='Location' placeholder={event.location} />
          <InputText name='author' label='Author' placeholder={event.author} />
          <InputText name='contact' label='Contact' placeholder={event.contact} />
          <InputText name='flavor' label='Flavor' placeholder={event.flavor} />
          <InputText name='options' label='Options' placeholder={event.options} />
          <InputText name='image' label='Image' placeholder={event.image} />
          <InputText name='about' label='About' placeholder={event.about} />
          
          <InputText name='optiona' label='Option A' placeholder={event.optiona} />
          <InputText name='testa' label='Test A' placeholder={event.testa} />
          <InputText name='successa' label='Success A' placeholder={event.successa} />
          <InputText name='winprizea' label='Win Prize A' placeholder={event.winprizea} />
          <InputText name='winnumbera' label='Win Number A' placeholder={event.winnumbera} />
          <InputText name='failurea' label='Failure A' placeholder={event.failurea} />
          <InputText name='failprizea' label='Fail Prize A' placeholder={event.failprizea} />
          <InputText name='failnumbera' label='Fail Number A' placeholder={event.failnumbera} />

          <InputText name='optionb' label='Option B' placeholder={event.optionb} />
          <InputText name='testb' label='Test B' placeholder={event.testb} />
          <InputText name='successb' label='Success B' placeholder={event.successb} />
          <InputText name='winprizeb' label='Win Prize B' placeholder={event.winprizeb} />
          <InputText name='winnumberb' label='Win Number B' placeholder={event.winnumberb} />
          <InputText name='failureb' label='Failure B' placeholder={event.failureb} />
          <InputText name='failprizeb' label='Fail Prize B' placeholder={event.failprizeb} />
          <InputText name='failnumberb' label='Fail Number B' placeholder={event.failnumberb} />
          
          <button>SAVE</button>
        </form>
      )}
      {tab === 'enemy' && (
        <form className="tab-content">
          <InputText name='name' label='Name' placeholder={enemy.name} />
          <InputText name='subtitle' label='Subtitle' placeholder={enemy.subtitle} />
          <InputText name='type' label='Type' placeholder={enemy.type} />
          <InputText name='location' label='Location' placeholder={enemy.location} />
          <InputText name='author' label='Author' placeholder={enemy.author} />
          <InputText name='intro' label='Intro' placeholder={enemy.intro} />
          <InputText name='can_run' label='Can Run?' placeholder={enemy.can_run} />
          <InputText name='health' label='Health' placeholder={enemy.health} />
          <InputText name='power' label='Power' placeholder={enemy.power} />
          <InputText name='damagevalue' label='Damage Value' placeholder={enemy.damagevalue} />
          <InputText name='damagetype' label='Damage Type' placeholder={enemy.damagetype} />
          <InputText name='exp' label='Exp' placeholder={enemy.exp} />
          <InputText name='prize_type' label='Prize Type' placeholder={enemy.prize_type} />
          <InputText name='prize_name' label='Prize Name' placeholder={enemy.prize_name} />
          <InputText name='hit01' label='Hit 01' placeholder={enemy.hit01} />
          <InputText name='hit02' label='Hit 02' placeholder={enemy.hit02} />
          <InputText name='hit03' label='Hit 03' placeholder={enemy.hit03} />
          <InputText name='art01' label='Art 01' placeholder={enemy.art01} />
          <InputText name='art02' label='Art 02' placeholder={enemy.art02} />
          <InputText name='artfreq' label='Art Frequency' placeholder={enemy.artfreq} />

          <button>SAVE</button>
        </form>
      )}
      
      {tab === 'character' && (
        <form className="tab-content">
          <InputText name='name' label='Name' placeholder={character.name} />
          <InputText name='author' label='Author' placeholder={character.author} />
          <InputText name='contact' label='Contact' placeholder={character.contact} />
          <InputText name='strength' label='Strength' placeholder={character.strength} />
          <InputText name='dexterity' label='Dexterity' placeholder={character.dexterity} />
          <InputText name='perception' label='Perception' placeholder={character.perception} />
          <InputText name='charisma' label='Charisma' placeholder={character.charisma} />
          <InputText name='knowledge' label='Knowledge' placeholder={character.knowledge} />
          <InputText name='luck' label='Luck' placeholder={character.luck} />
          <InputText name='sprite_icon' label='Sprite Icon' placeholder={character.sprite_icon} />
          <InputText name='sprite_back' label='Sprite Back' placeholder={character.sprite_back} />
          <InputText name='sprite_house' label='Sprite House' placeholder={character.sprite_house} />
          <InputText name='portrait_a' label='Portrait A' placeholder={character.portrait_a} />
          <InputText name='name_a' label='Name A' placeholder={character.name_a} />
          <InputText name='portrait_b' label='Portrait B' placeholder={character.portrait_b} />
          <InputText name='name_b' label='Name Back' placeholder={character.name_b} />
          <InputText name='menu_tag' label='Menu Tag' placeholder={character.menu_tag} />
          <InputText name='menu_desc' label='Menu Description' placeholder={character.menu_desc} />
          <InputText name='perkpack_a' label='Perk Pack A' placeholder={character.perkpack_a} />
          <InputText name='perkpack_b' label='Perk Pack B' placeholder={character.perkpack_b} />
          
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
