import gitHash from "../../../../.gitHash.json"

export const APPLIED_MIGRATIONS = "APPLIED_MIGRATIONS";
export const CURRENT_VERSION = "CURRENT_VERSION";
//export const UPDATE_READY = "UPDATE_READY";

const moduleState = {
  [APPLIED_MIGRATIONS]: [],
  [CURRENT_VERSION]: gitHash.head,
};

export const BUMP_VERSION = "BUMP_VERSION";
export const ADD_APPLIED_MIGRATION = "ADD_APPLIED_MIGRATION";

const mutations = {
  [BUMP_VERSION]: (state, version) =>
    Object.assign(state, {
      [CURRENT_VERSION]: version
    }),
  [ADD_APPLIED_MIGRATION]: (state, migrationId) =>
    Object.assign(state, {
      [APPLIED_MIGRATIONS]: [...state[APPLIED_MIGRATIONS], migrationId]
    }),
};

export const APPLY_MIGRATION = "APPLY_MIGRATION";

const actions = {
  [APPLY_MIGRATION]: ({ commit, rootState }, migration) => {
    // Load and run migration
    commit(ADD_APPLIED_MIGRATION, migration.id);
    commit(BUMP_VERSION, migration.version);
  }
};

export default {
  state: moduleState,
  mutations,
  actions,
};
