const SkillsCheckBox = ({checked, handleChange}) {

    return(
        <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        My Value
      </label>

      <p>Is "My Value" checked? {checked.toString()}</p>
    </div>

    )
}