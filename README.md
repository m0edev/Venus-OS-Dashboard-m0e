# 🗲 Venus OS Dashboard — m0e fork 🗲

------------------------------------------------------------------------

## 🚀 What is Venus OS Dashboard?

**Venus OS Dashboard** is a custom Lovelace card that replicates the
look and feel of the **Venus OS GUI v2** inside the [Home
Assistant](https://www.home-assistant.io/) Dashboard UI.

It visually matches the VRM / Venus OS interface while remaining fully
customizable within Home Assistant.

This repository is a fork of
[skydarc/Venus-OS-Dashboard](https://github.com/skydarc/Venus-OS-Dashboard),
renamed so it can be installed **alongside** the original rather than
replacing it. See [Fork changes](#-fork-changes) below.

------------------------------------------------------------------------

## ✨ Features

-   🛠 Full UI editor (no need to edit `yaml`)
-   😍 Built-in icon picker
-   ⚓ Built-in entity picker
-   🚀 Zero dependencies — no additional custom cards required
-   🌈 Based on Material UI
-   🌓 Supports both light and dark themes
-   🌍 Internationalization support:\
    FR \| EN \| IT \| ES \| PT \| DE \| NL \| RU \| PL \| TR \| AR

> ⚠ Some language files may not be perfect --- feel free to submit
> corrections.

------------------------------------------------------------------------

## 🔄 Behavioral / Feature Differences

Some features are inspired by KeonHHH's fork — thanks to him 🙏

| Feature / Area | Previous Versions | New Version |
|---------------|-------------------|-------------|
| Power flow animation | Single moving dot | Multi-dot Venus OS style animation |
| Localization | English / French | German, Italian, Portuguese, and more |
| Documentation / README | Minimal, no YAML config | Full configuration reference, MQTT guide, troubleshooting |
| Example layout | Not included | Added `example.yaml` (Grid, Solar, Inverter, Loads, Battery) |
| Editor / UX | Some untranslated UI | Improved editor UI with translated strings |
| VRM visual match | Approximate | Closer animations and sizing, matching the VRM style more closely |
| Multiple instances in one panel | Buggy, no linking| Multiple cards supported in one ha panel |


------------------------------------------------------------------------

## 🆕 New Features

-   Replace +/- signs with directional arrows (optional toggle)
-   New side gauge (Venus OS style), optional and multicolor
-   Added languages: RU, PL, TR, AR
-   Optional background texture for the main gauge
-   Optional wave animation for the main gauge
-   Redesigned tap action management
-   Optional text labels above the header, secondary and footer values

------------------------------------------------------------------------

## 🍴 Fork changes

Everything below is specific to this fork and is not in
[skydarc/Venus-OS-Dashboard](https://github.com/skydarc/Venus-OS-Dashboard):

| Change | Why |
|---|---|
| **Optional value labels** — `headerLabel`, `entity2Label`, `footerLabel1/2/3` | A bare number in a footer cell does not say what it is. |
| **Renamed custom elements** — card type is `custom:venus-os-dashboard-m0e` | Element names are global to the page, so the two cards could not otherwise be installed together. |
| **`filename` key in `hacs.json`** | HACS looks for `{repo-name}.js`, which stopped matching once the repository was renamed. |
| **Fixed `lang-es.js`** | The file began with `port default` instead of `export default`, so the Spanish translation threw on import and silently fell back to English. |
| **Info list box type** — `type: list` | A box that shows uniform label/value rows for any number of entities. |
| **Per-box height** — `height:` | Shrink one box in a column; the others share the rest. |
| **Value formatting** — `map`, `format: duration`, `precision`, `scale: auto` | State-name mapping, `1d 9h` durations, decimals, `W → kW`. |
| **`unavailable` shown as `—`** | Instead of the literal word. |
| **Render skipping** | The card previously re-rendered on *every* state change in your HA instance; it now skips ticks where nothing it displays has changed. |
| **CI language check** | A workflow job fails if any translation file drifts out of sync with `lang-en.js`. |
| **SOC-colored gauge** | The main % gauge fill turns orange below 50 %, red below 20 %. |
| **Alarm pulse** — `alarmEntity:` | The box border pulses orange/red while an alarm entity is active. |
| **Label styling** — `styles.labelStyle` | Casing, weight, opacity and size of the value captions. |

The card also prints `version 0.9.1 (m0e fork)` in the browser console, so
you can tell which module loaded when both are installed.

------------------------------------------------------------------------

# 📦 Installation

## 🔹 HACS (Recommended)

This fork is not in the HACS default store, so it has to be added as a
custom repository:

**1.** Make sure [HACS](https://hacs.xyz/) is installed in your Home Assistant instance
**2.** Add this repository as a custom repository in HACS:
   - Go to HACS
   - Click the three dots in the top right corner
   - Select **Custom repositories**
   - Repository: `https://github.com/m0edev/Venus-OS-Dashboard-m0e`
   - Type: **Dashboard**
   - Click **ADD**
**3.** Find **Venus OS Dashboard (m0e fork)** in HACS and click **Download**

   If the search does not find it, open **Custom repositories** again and
   click the entry's name — that opens its page directly.
**4.** Hard-refresh the browser (Ctrl+Shift+R) — the old JS is cached aggressively

HACS installs to `/hacsfiles/Venus-OS-Dashboard-m0e/` and registers the
Lovelace resource for you, unless your dashboard is in YAML mode — then add
`/hacsfiles/Venus-OS-Dashboard-m0e/Venus-OS-Dashboard.js` yourself under
Settings → Dashboards → Resources, as a **JavaScript Module**.

And voilà! **Venus OS Dashboard (m0e fork)** should now be available in the
Lovelace card picker menu.

Enjoy! 🎉

------------------------------------------------------------------------

## 🔹 Manual Installation

**1.**  Copy the contents of this repository's `dist` folder into
        `www/venus-os-dashboard-m0e` in your Home Assistant config
        directory. Keep all the files together — the card imports
        `editor.js`, `lib-venus.js`, the `css-*.js` and the `lang-*.js`
        files as ES modules at runtime.
**2.**  Go to Settings → Dashboards → Resources.
**3.**  Add:

    /local/venus-os-dashboard-m0e/Venus-OS-Dashboard.js

**4.**  Select **JavaScript Module**.
**5.**  Restart Home Assistant.

------------------------------------------------------------------------

## Usage

Venus OS Dashboard can be configured using the Dashboard UI editor.

1. In the Dashboard UI, click the three dots in top right corner.
2. Click **Edit Dashboard**.
3. Click Plus button to add a new card.
4. Find **Custom: Venus OS Dashboard (m0e fork)** card in the list.

------------------------------------------------------------------------

### ⚠ This is a fork — it can be installed next to the original

This repository is a fork of
[skydarc/Venus-OS-Dashboard](https://github.com/skydarc/Venus-OS-Dashboard).
Custom element names are global to the browser page, so if both cards
registered the same name the second one to load would throw
`the name "venus-os-dashboard" has already been used` and never start.

To avoid that, this fork registers its own names:

| | Original | This fork |
|---|---|---|
| Card type (YAML) | `custom:venus-os-dashboard` | `custom:venus-os-dashboard-m0e` |
| Custom element | `venus-os-dashboard` | `venus-os-dashboard-m0e` |
| Editor element | `venus-os-editor` | `venus-os-editor-m0e` |
| HACS folder | `/hacsfiles/Venus-OS-Dashboard/` | `/hacsfiles/Venus-OS-Dashboard-m0e/` |

Both can therefore be installed and used at the same time. Point a card at
whichever one you want with its `type:`; existing cards using
`custom:venus-os-dashboard` keep using the original and are unaffected.

One caveat: the card injects its stylesheet into the light DOM, so its CSS
rules are page-global. The two stylesheets are near-identical, but if you
put an original card and a fork card on the same view with **different**
`theme:` values, whichever renders last wins for both.

If you would rather not run both, uninstall the original and this fork will
be the only one — but its `type:` is still `custom:venus-os-dashboard-m0e`,
so update your cards accordingly.

------------------------------------------------------------------------

### New Animation Threshold

The animationThreshold parameter controls (for each link) when the animated balls on connection lines appear or disappear:

- When power flow is **above the threshold** (in absolute value), balls are visible and animate
- When power flow is **below the threshold**, balls fade out and disappear
- No Default value: If not set, no threshold is applied. 
- Uses the same unit as the linked entity.
- Works with both positive and negative values (grid import/export, battery charge/discharge)

------------------------------------------------------------------------

### New box max height

You can now define a **maximum height per box**, allowing bottom anchors like in the original version.

Set it in the editor's first tab, under *Box's max height (%)*, or as
`param.maxHeigth` in YAML.

------------------------------------------------------------------------

### +/- icon replacement

Like in Venus-OS, you can replace +/- signs with Venus-OS style arrows.

The arrow :

 - Shows direction

 - Changes color depending on power flow

 - Fully optional (toggle in editor)

------------------------------------------------------------------------

### New side gauge

Again, as Venus-OS, you can add a small vertical gauge on the right side of any box.

In the editor, open the box's *Side gauge configuration* panel and define:

 - An entity (`sideGaugeEntity`)

 - A maximum value (`sideGaugeMax`)

and voilà! The fill colour follows the value: green when negative, blue up
to 70 %, orange from 70 %, red from 90 %. The gauge stays hidden unless both
keys are set and the entity is numeric.

------------------------------------------------------------------------

### Main Gauge Enhancements

New dedicated configuration ha-expansion-panel: *Main gauge configuration*.

This menu is **disabled** if the main entity unit is not **"%"**.

Options include:

 - Background texture, for a tank level style display (`gaugeTexture`)

 - Wave animation, the Venus OS filling effect (`gaugeWaveEntity`)

------------------------------------------------------------------------

### Value labels (captions)

The header value, the secondary value and each of the three footer cells can
carry an optional short caption, displayed just above the value:

``` yaml
devices:
  2-1:
    icon: mdi:sine-wave
    name: Inverter
    entity: sensor.venus_os_inverter_power
    headerEntity: sensor.venus_os_inverter_temp
    headerLabel: Temp
    entity2: sensor.venus_os_battery_voltage
    entity2Label: Batt
    footerEntity1: sensor.venus_os_ess_setpoint
    footerLabel1: ESS
    footerEntity2: sensor.venus_os_ac_current
    footerEntity3: sensor.venus_os_mppt_state
    footerLabel3: MPPT
```

All five keys (`headerLabel`, `entity2Label`, `footerLabel1`, `footerLabel2`,
`footerLabel3`) are optional and also editable from the UI editor, in the
**Main sensor configuration** and **Header and footer sensors configuration**
panels.

Notes:

 - A cell without a label keeps exactly the same markup and layout as before,
   so existing dashboards are unaffected.

 - When at least one footer cell has a label, the footer values are
   bottom-aligned so they stay on a single line.

 - Labels are plain text and are HTML-escaped, so `&`, `<` and `>` are safe to
   use.

 - This replaces the usual `card-mod` + `::before` workaround, which depended
   on the card's internal class names and IDs.

------------------------------------------------------------------------

### Appearance

**SOC-colored gauge** — automatic: any box with `gauge: true` fills orange
below 50 % and red below 20 %, VRM-style. Above 50 % it keeps the default
blue.

**Alarm pulse** — give a box an `alarmEntity`; while it is active the box
border pulses:

``` yaml
    alarmEntity: binary_sensor.venus_os_low_battery
```

`on`, `2` or `alarm` pulse red; `1` or `warning` pulse orange (Victron
alarm sensors report 0 / 1 / 2). Also settable from the UI editor, in the
box's header panel.

For a template sensor that reports free text (e.g. `OK` normally and an
alarm name when active), declare which states mean "no alarm" instead —
anything else pulses red (`unavailable`/`unknown` never count as alarms):

``` yaml
    alarmEntity: sensor.victron_system_alarms_status
    alarmOkStates: [OK]
```

**Label styling** — restyle the value captions card-wide, under `styles:`:

``` yaml
styles:
  header: auto
  sensor: auto
  footer: auto
  labelStyle:
    case: normal      # "normal" or default uppercase
    weight: 400       # font weight (default 600)
    opacity: 0.8      # default 0.5
    size: 0.8em       # default 0.7em
```

All keys optional; omit any to keep its default.

------------------------------------------------------------------------

### Value formatting

Any value slot can format its raw state. For the five secondary slots
(`headerEntity`, `entity2`, `footerEntity1/2/3`) and for info-list rows,
replace the entity string with an object:

``` yaml
    headerEntity:
      entity: sensor.venus_os_time_to_go
      format: duration          # seconds -> "1d 9h" / "2h 05m" / "45m"
    footerEntity1:
      entity: sensor.venus_os_battery_voltage
      precision: 1              # decimals; 26.3841 -> 26.4
    footerEntity3:
      entity: sensor.venus_os_mppt_state
      map:                      # raw state -> display text
        "3": Bulk
        "4": Absorption
        "5": Float
```

For the **main entity** the same keys go directly on the device (the
`entity` key itself stays a plain string):

``` yaml
    entity: sensor.venus_os_grid_power
    scale: auto                 # 1240 W -> 1.24 kW (also kW->MW, Wh/kWh, VA)
    precision: 2
```

All keys are optional and combine freely. Entities whose state is
`unavailable` or `unknown` display as `—`. Slot objects are YAML-only for
now — the UI editor edits the `entity` inside them without touching the
formatting keys.

------------------------------------------------------------------------

### Info list box

Turn any box into a list of uniform label/value rows — handy for alarms,
temperatures, limits, or anything that doesn't need a big number:

``` yaml
  3-2:
    type: list
    icon: mdi:bell-outline
    name: Status
    entities:
      - entity: sensor.venus_os_battery_voltage
        label: Battery V
        precision: 1
      - entity: sensor.venus_os_mppt_state
        label: MPPT
        map: { "3": Bulk, "4": Absorption }
      - entity: number.venus_os_ac_current_limit
        label: AC limit
```

Rows share one font size (the footer size), scroll inside the box when
there are too many, and accept the same formatting keys as other slots.
The graph, gauge and side gauge are hidden for a `list` box; anchors and
links keep working. In the UI editor, the **Info list** panel has the
type switch and an add/remove row editor.

------------------------------------------------------------------------

### Box height

Fix one box's height as a percentage of its column; the remaining boxes
share what's left:

``` yaml
param:
  boxCol3: 2
devices:
  3-1:
    name: Home
    entity: sensor.venus_os_ac_loads
    height: 30
  3-2:
    type: list
    ...
```

Also editable in the UI editor, under the box's header panel.

------------------------------------------------------------------------

### New action menu

A new ha-expansion-panel allows configuring box actions.

In UI Editor, only the "tap" action is available, but technically, **YAML also supports "hold" and "double tap"**.

**UI Editor supports:**

 - Tap action

**YAML additionally supports:**

 - Hold action

 - Double tap action

**Available actions:**

 - **Default** (show main entity info),
 - **More-info** (show selected entity),
 - **Navigation**, loads a HA panel using the "Navigation Path". This one don't have helper in the picker. But it's pretty easy to have le "navigation path". It's the second part of the url, after the "ip:port" couple.
   ex.: http://192.168.x.x:8123/energy -> "**/energy**" is the path
 - **Toggl**e (toggle selected entity),
 - **Call-service**, allows you to trigger any service, script, or automation,
 - **None**... disable the action on box,

Some YAML examples:

```yaml
      tap_action:
        action: more-info
        entity: sensor.venus_os_grid_current
```
```yaml
      hold_action:
        action: navigate
        navigation_path: /energy
```
```yaml
      tap_action:
        action: toggle
        entity: switch.venus_os_allow_max_charge_voltage
```
```yaml
      tap_action:
        action: call-service
        service: script.turn_on
        entity_id: script.victron_force_bulk
```
```yaml
      double_tap_action:
        action: call-service
        service: number.set_value
        entity_id: number.venus_os_ac_current_limit
        value: 3
```

------------------------------------------------------------------------

### devices (required)

A map of device boxes keyed by "<column>-<box>" (for example 1-1, 2-1, 3-2). Each device entry supports:

- name — display title (string).

- icon — mdi or other icon string.

- entity — main entity shown large in the box (e.g., sensor.grid_total).

- headerEntity — optional small value shown in header (e.g., battery temperature).

- headerLabel — optional caption displayed above the headerEntity value.

- entity2 — optional second sensor shown near main sensor (smaller).

- entity2Label — optional caption displayed above the entity2 value.

- footerEntity1 / footerEntity2 / footerEntity3 — optional values shown in the footer row (three cols).

- footerLabel1 / footerLabel2 / footerLabel3 — optional captions displayed above the matching footer values.

- headerEntity / entity2 / footerEntity1-3 also accept an object form `{ entity, map, format, precision, scale }` — see "Value formatting".

- map / format / precision / scale — optional formatting for the **main** entity value (device level) — see "Value formatting".

- height — optional fixed height for this box, in % of its column; sibling boxes share the remainder.

- type: list — turns the box into an info list; entities — its list of rows `{ entity, label, ... }` — see "Info list box".

- alarmEntity — optional entity whose active state makes the box border pulse — see "Appearance".

- graph: true — show mini-history graph in that box (requires historical data).

- gauge: true — show vertical gauge fill (expects percentage % to work correctly).

- anchors — define anchor points on the box used to connect links. Format: comma-separated items T-2, B-1, L-1, R-1 where T/B/L/R = top/bottom/left/right and number = position index. Example: "L-1, B-2, R-1".

- link — map of link definitions (named, e.g. "1", "2"). Each link object:

   - start — anchor id on this box (e.g. R-1).

   - end — anchor id on the target box (e.g. 2-1_L-1 — this uses target box coordinate format).

   - entity — optional entity controlling direction/speed of animated balls along the link.

   - inv: "true" — optional flag to invert direction for that link (inv means the link's direction multiplier will be toggled).

------------------------------------------------------------------------

### How anchors and links work

- When rendering boxes, the card creates anchor DOM elements at positions on box edges (left, right, top, bottom).

- creatAnchors() positions anchors evenly depending on the number specified (e.g., B-2 creates two anchors along the bottom).

- creatLine() draws an SVG path between anchor coordinates and creates animated "balls" following the path.

- If you see NaN warnings in the console, the anchor ID might not exist or the layout may not be ready yet — check your anchor strings and box IDs.

------------------------------------------------------------------------

### Creating sensors (Victron Cerbo / Multiplus / Venus OS on RPI / MQTT)

- If you use Victron + Cerbo + MQTT you’ll often get power topics like:
  ```yaml
  cerbo/N/<id>/system/0/Ac/Consumption/L1/Power
  cerbo/N/<id>/system/0/Ac/ConsumptionOnInput/L1/Power
   ```
   use [MQTT Explorer](https://mqtt-explorer.com/) to explore all available topics and values.
   
- Example MQTT sensor entries to add to sensor.yaml:
  ```yaml
   - platform: mqtt
     unique_id: cerbo_ac_consumption_l1_power
     name: "AC Consumption L1 Power"
     state_topic: "cerbo/N/<id>/system/0/Ac/Consumption/L1/Power"
     device_class: power
     state_class: measurement
     unit_of_measurement: "W"
     value_template: "{{ value | float | round(0) }}"

   - platform: mqtt
     unique_id: cerbo_ac_consumption_on_input_l1_power
     name: "AC Consumption On Input L1 Power"
     state_topic: "cerbo/N/<id>/system/0/Ac/ConsumptionOnInput/L1/Power"
     device_class: power
     state_class: measurement
     unit_of_measurement: "W"
     value_template: "{{ value | float | round(0) }}"
   ```
- If the MQTT messages are JSON (e.g., { "value": 123 }), use value_json.value in the value_template.

------------------------------------------------------------------------

### Rounding & numeric formatting

- Use the `precision` key (per slot, or device-level for the main entity) — see "Value formatting". No code changes needed.

------------------------------------------------------------------------

### Troubleshooting

- Empty graphs / no historic data — make sure the Recorder integration includes the entities and that HA's history is recording them.
   
- Anchor/NaN errors — verify anchors syntax and boxCol sizes; check in browser console the DOM to confirm anchors exist with expected IDs.
   
- Only one dot on path — path is likely very short. Check anchor positions; increase spacingPx or reduce it to force more dots. Also ensure path.getTotalLength() returns a value — certain SVG path commands/format may cause problems.
   
- External control / Inverter state not showing — subscribe to cerbo/N/<your-id>/# with an MQTT client (MQTT Explorer) to find which topic maps to the inverter state. Often settings/Settings/CGwacs/Hub4Mode or system/0/Ac/Inverter/State or vebus/<deviceid>/State contain the useful state.
   
- Widgets not responsive — ensure checkReSize() is called or use razDashboardOldWidth() after resizing; the card uses the bounding rect to recalc layout.
