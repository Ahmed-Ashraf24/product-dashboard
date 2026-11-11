import { useState } from "react";
import './SettingsPage.css';
function SettingsPage({ settings, onSettingsChange, onSave }) {
  const [savedMessage, setSavedMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    onSettingsChange((current) => ({
      ...current,
      [name]: value,
    }));

    setSavedMessage('');
  }

  function handleSave(event) {
    event.preventDefault();
    onSave();
    setSavedMessage('Settings saved successfully!');
  }

  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <h2>Settings</h2>
          <p>Customize your dashboard experience.</p>
        </div>
      </div>

      <form className="settings-container" onSubmit={handleSave}>
        <section className="settings-section">
          <h3>Appearance</h3>
          <p>Choose your preferred dashboard appearance.</p>

          <label htmlFor="theme">Theme</label>
          <select
            id="theme"
            name="theme"
            value={settings.theme}
            onChange={handleChange}
          >
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
          </select>
        </section>

        <section className="settings-section">
          <h3>Preferences</h3>
          <p>Manage your dashboard display preferences.</p>

          <label htmlFor="name">Display Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={settings.name}
            onChange={handleChange}
            required
            maxLength={50}
          />

          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            name="currency"
            value={settings.currency}
            onChange={handleChange}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EGP">EGP - Egyptian Pound</option>
            <option value="EUR">EUR - Euro</option>
          </select>
        </section>

        {savedMessage && (
          <p className="settings-success" role="status">
            {savedMessage}
          </p>
        )}

        <button type="submit" className="primary-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default SettingsPage;