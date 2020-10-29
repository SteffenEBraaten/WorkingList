# Documentation #

**Group members:**
* Tine Margretha Vister (tinemv@ifi.uio.no)
* Steffen Ekeberg Bråten (steeffeb@ifi.uio.no)
* Thao Tran (thanht@ifi.uio.no)
* Steven Hoang Giang Nguyen (shnguyen@ifi.uio.no)
* Susanne Semsøy (susansem@ifi.uio.no)

## Functionality ##

The application aims to assist health workers and contact tracers with keeping track of the cases and contacts they need to follow up on. To achieve this, the application gives a simplified overview of the persons that they should contact at any given date. From this overview, the user can access more extensive features in the Tracker Capture App.

The overview consists of a table with relevant information about index cases and contacts, as well as their status. The overview also provide the user with an exact number of persons that needs to be contacted. The user can sort the overview to their personal needs by filtering the results that are displayed, as well as choosing their preferred time period. Theres also a search functionality, making it easy to find the results desired.


## Implementation

The information displayed in our application is fetched from the DHIS2 API, however, we have prioritized information most relevant to the user. At startup, the application fetches the workload for today (default) as well as data like the user’s username. The information is then displayed in a table, showing both index cases and contacts as default. Then the application will count through scheduled due dates for today and display it. The user can also choose to see all contacts linked to an index cases within a modal.

If the user wants to view another date, or a range of dates (e.g. the next 10 days), this can be done through the calendar-feature. The new data is then fetched from the API and displayed accordingly.

To achieve a cohesive design, the different components is all from the DHIS2 design library. The exception is the calendar-feature (taken from the React Library), since DHIS2 do not offer this.

Furthermore, to keep the application efficient, the application uses server-side rendering when showing both index cases and contacts, and client-side for the rest.

## Possible improvements

Tas etter at prosjektet er ferdig.

## Available Scripts

This project was bootstrapped with [DHIS2 Application Platform](https://github.com/dhis2/app-platform).

In the project directory, you can run:

### `yarn install`

Must be done in order for `yarn start` to work.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
A deployable `.zip` file can be found in `build/bundle`!

See the section about [building](https://platform.dhis2.nu/#/scripts/build) for more information.

## Learn More

You can learn more about the platform in the [DHIS2 Application Platform Documentation](https://platform.dhis2.nu/).

You can learn more about the runtime in the [DHIS2 Application Runtime Documentation](https://runtime.dhis2.nu/).

To learn React, check out the [React documentation](https://reactjs.org/).
