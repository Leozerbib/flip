-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA public IS 'standard public schema';

-- DROP TYPE public."executed_prank_status_enum";

CREATE TYPE public."executed_prank_status_enum" AS ENUM (
	'proposed_by_debtor',
	'proposed_by_creditor',
	'accepted_by_target',
	'executed_pending_validation',
	'validated_by_target_completed',
	'rejected',
	'failed_execution');

-- DROP TYPE public."friendship_status_enum";

CREATE TYPE public."friendship_status_enum" AS ENUM (
	'pending',
	'accepted',
	'declined',
	'blocked');

-- DROP TYPE public."mission_type_enum";

CREATE TYPE public."mission_type_enum" AS ENUM (
	'render_services',
	'repay_debts_prank',
	'repay_debts_service',
	'invite_friends',
	'reach_level',
	'use_x_prank_type',
	'perform_x_services_category');

-- DROP TYPE public."prank_type_enum";

CREATE TYPE public."prank_type_enum" AS ENUM (
	'declarative',
	'in_app_cosmetic',
	'in_app_lock',
	'notification_spam',
	'external_action');

-- DROP TYPE public."service_status_enum";

CREATE TYPE public."service_status_enum" AS ENUM (
	'pending_confirmation',
	'confirmed_unpaid',
	'repaid_by_service',
	'repaid_by_prank',
	'cancelled',
	'disputed');

-- DROP TYPE public."user_mission_status_enum";

CREATE TYPE public."user_mission_status_enum" AS ENUM (
	'not_started',
	'in_progress',
	'completed_pending_claim',
	'claimed',
	'expired');

-- DROP SEQUENCE public.executed_pranks_executed_prank_id_seq;

CREATE SEQUENCE public.executed_pranks_executed_prank_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.friendships_friendship_id_seq;

CREATE SEQUENCE public.friendships_friendship_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.missions_mission_id_seq;

CREATE SEQUENCE public.missions_mission_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.pranks_prank_id_seq;

CREATE SEQUENCE public.pranks_prank_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.service_categories_category_id_seq;

CREATE SEQUENCE public.service_categories_category_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.services_service_id_seq;

CREATE SEQUENCE public.services_service_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.user_missions_user_mission_id_seq;

CREATE SEQUENCE public.user_missions_user_mission_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.users_user_id_seq;

CREATE SEQUENCE public.users_user_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Function for updating updated_at columns
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$function$
;

-- public.pranks definition

-- Drop table

-- DROP TABLE public.pranks;

CREATE TABLE public.pranks (
	prank_id serial4 NOT NULL,
	"name" varchar(100) NOT NULL,
	description text NOT NULL,
	default_jeton_cost_equivalent int4 NOT NULL, -- Valeur en jetons que ce prank peut rembourser
	xp_reward_executor int4 DEFAULT 0 NULL, -- XP pour celui qui réalise le prank
	xp_reward_target int4 DEFAULT 0 NULL, -- XP pour celui qui "subit" le prank (pour le fair-play)
	coins_reward_executor int4 DEFAULT 0 NULL,
	coins_reward_target int4 DEFAULT 0 NULL,
	"type" public."prank_type_enum" NOT NULL, -- 'external_action' pour celles qui nécessitent une action hors app (ex: photo preuve)
	config_details_json jsonb NULL, -- Ex: { "duration_minutes": 5 } pour in_app_lock
	requires_proof bool DEFAULT false NOT NULL, -- Si une preuve est nécessaire pour les 'declarative' ou 'external_action'
	is_active bool DEFAULT true NOT NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT pranks_coins_reward_executor_check CHECK ((coins_reward_executor >= 0)),
	CONSTRAINT pranks_coins_reward_target_check CHECK ((coins_reward_target >= 0)),
	CONSTRAINT pranks_default_jeton_cost_equivalent_check CHECK ((default_jeton_cost_equivalent >= 0)),
	CONSTRAINT pranks_name_key UNIQUE (name),
	CONSTRAINT pranks_pkey PRIMARY KEY (prank_id),
	CONSTRAINT pranks_xp_reward_executor_check CHECK ((xp_reward_executor >= 0)),
	CONSTRAINT pranks_xp_reward_target_check CHECK ((xp_reward_target >= 0))
);

-- Column comments

COMMENT ON COLUMN public.pranks.default_jeton_cost_equivalent IS 'Valeur en jetons que ce prank peut rembourser';
COMMENT ON COLUMN public.pranks.xp_reward_executor IS 'XP pour celui qui réalise le prank';
COMMENT ON COLUMN public.pranks.xp_reward_target IS 'XP pour celui qui "subit" le prank (pour le fair-play)';
COMMENT ON COLUMN public.pranks."type" IS '''external_action'' pour celles qui nécessitent une action hors app (ex: photo preuve)';
COMMENT ON COLUMN public.pranks.config_details_json IS 'Ex: { "duration_minutes": 5 } pour in_app_lock';
COMMENT ON COLUMN public.pranks.requires_proof IS 'Si une preuve est nécessaire pour les ''declarative'' ou ''external_action''';


-- public.service_categories definition

-- Drop table

-- DROP TABLE public.service_categories;

CREATE TABLE public.service_categories (
	category_id serial4 NOT NULL,
	"name" varchar(100) NOT NULL,
	icon_url varchar(255) DEFAULT NULL::character varying NULL, -- Optionnel: pour affichage
	description text NULL,
	CONSTRAINT service_categories_name_key UNIQUE (name),
	CONSTRAINT service_categories_pkey PRIMARY KEY (category_id)
);

-- Column comments

COMMENT ON COLUMN public.service_categories.icon_url IS 'Optionnel: pour affichage';


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	user_id serial4 NOT NULL,
	username varchar(50) NOT NULL,
	email varchar(100) NOT NULL,
	password_hash varchar(255) NOT NULL,
	profile_picture_url varchar(255) DEFAULT NULL::character varying NULL,
	"level" int4 DEFAULT 1 NOT NULL,
	xp_points int4 DEFAULT 0 NOT NULL,
	game_coins int4 DEFAULT 0 NOT NULL, -- Monnaie virtuelle gagnée
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	updated_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_game_coins_check CHECK ((game_coins >= 0)),
	CONSTRAINT users_level_check CHECK (("level" > 0)),
	CONSTRAINT users_pkey PRIMARY KEY (user_id),
	CONSTRAINT users_username_key UNIQUE (username),
	CONSTRAINT users_xp_points_check CHECK ((xp_points >= 0))
);

-- Column comments

COMMENT ON COLUMN public.users.game_coins IS 'Monnaie virtuelle gagnée';

-- Table Triggers

create trigger update_users_updated_at before
update
    on
    public.users for each row execute function update_updated_at_column();


-- public.friendships definition

-- Drop table

-- DROP TABLE public.friendships;

CREATE TABLE public.friendships (
	friendship_id serial4 NOT NULL,
	user_one_id int4 NOT NULL, -- L'initiateur de la demande OU l'utilisateur avec l'ID le plus bas pour éviter les doublons
	user_two_id int4 NOT NULL, -- Le receveur de la demande OU l'utilisateur avec l'ID le plus haut
	status public."friendship_status_enum" DEFAULT 'pending'::friendship_status_enum NOT NULL,
	action_user_id int4 NOT NULL, -- Qui a fait la dernière action (envoyé la demande, accepté, bloqué)
	requested_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	accepted_at timestamptz NULL,
	updated_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT check_different_users CHECK ((user_one_id <> user_two_id)),
	CONSTRAINT friendships_pkey PRIMARY KEY (friendship_id),
	CONSTRAINT unique_friendship UNIQUE (user_one_id, user_two_id),
	CONSTRAINT friendships_action_user_id_fkey FOREIGN KEY (action_user_id) REFERENCES public.users(user_id) ON DELETE CASCADE,
	CONSTRAINT friendships_user_one_id_fkey FOREIGN KEY (user_one_id) REFERENCES public.users(user_id) ON DELETE CASCADE,
	CONSTRAINT friendships_user_two_id_fkey FOREIGN KEY (user_two_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);
CREATE INDEX idx_friendships_status ON public.friendships USING btree (status);
CREATE INDEX idx_friendships_user_one ON public.friendships USING btree (user_one_id);
CREATE INDEX idx_friendships_user_two ON public.friendships USING btree (user_two_id);

-- Column comments

COMMENT ON COLUMN public.friendships.user_one_id IS 'L''initiateur de la demande OU l''utilisateur avec l''ID le plus bas pour éviter les doublons';
COMMENT ON COLUMN public.friendships.user_two_id IS 'Le receveur de la demande OU l''utilisateur avec l''ID le plus haut';
COMMENT ON COLUMN public.friendships.action_user_id IS 'Qui a fait la dernière action (envoyé la demande, accepté, bloqué)';

-- Table Triggers

create trigger update_friendships_updated_at before
update
    on
    public.friendships for each row execute function update_updated_at_column();


-- public.missions definition

-- Drop table

-- DROP TABLE public.missions;

CREATE TABLE public.missions (
	mission_id serial4 NOT NULL,
	title varchar(150) NOT NULL,
	description text NULL,
	"type" public."mission_type_enum" NOT NULL,
	target_value int4 DEFAULT 1 NULL, -- Ex: rendre 5 services, inviter 3 amis
	xp_reward int4 DEFAULT 0 NOT NULL,
	coins_reward int4 DEFAULT 0 NOT NULL,
	jeton_reward int4 DEFAULT 0 NOT NULL, -- Peut-on gagner des jetons/points de dette via missions?
	prank_reward_id int4 NULL, -- Récompense sous forme de prank "gratuit" à utiliser
	is_active bool DEFAULT true NOT NULL,
	is_repeatable bool DEFAULT false NOT NULL,
	repeat_cooldown_hours int4 NULL, -- Si répétable, délai avant de pouvoir la refaire
	unlock_level_required int4 DEFAULT 1 NULL, -- Niveau requis pour voir/faire cette mission
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT missions_coins_reward_check CHECK ((coins_reward >= 0)),
	CONSTRAINT missions_jeton_reward_check CHECK ((jeton_reward >= 0)),
	CONSTRAINT missions_pkey PRIMARY KEY (mission_id),
	CONSTRAINT missions_repeat_cooldown_hours_check CHECK (((repeat_cooldown_hours IS NULL) OR (repeat_cooldown_hours >= 0))),
	CONSTRAINT missions_target_value_check CHECK ((target_value > 0)),
	CONSTRAINT missions_unlock_level_required_check CHECK ((unlock_level_required > 0)),
	CONSTRAINT missions_xp_reward_check CHECK ((xp_reward >= 0)),
	CONSTRAINT missions_prank_reward_id_fkey FOREIGN KEY (prank_reward_id) REFERENCES public.pranks(prank_id) ON DELETE SET NULL
);
CREATE INDEX idx_missions_is_active ON public.missions USING btree (is_active);
CREATE INDEX idx_missions_type ON public.missions USING btree ("type");

-- Column comments

COMMENT ON COLUMN public.missions.target_value IS 'Ex: rendre 5 services, inviter 3 amis';
COMMENT ON COLUMN public.missions.jeton_reward IS 'Peut-on gagner des jetons/points de dette via missions?';
COMMENT ON COLUMN public.missions.prank_reward_id IS 'Récompense sous forme de prank "gratuit" à utiliser';
COMMENT ON COLUMN public.missions.repeat_cooldown_hours IS 'Si répétable, délai avant de pouvoir la refaire';
COMMENT ON COLUMN public.missions.unlock_level_required IS 'Niveau requis pour voir/faire cette mission';


-- public.user_missions definition

-- Drop table

-- DROP TABLE public.user_missions;

CREATE TABLE public.user_missions (
	user_mission_id serial4 NOT NULL,
	user_id int4 NOT NULL,
	mission_id int4 NOT NULL,
	progress int4 DEFAULT 0 NOT NULL,
	status public."user_mission_status_enum" DEFAULT 'not_started'::user_mission_status_enum NOT NULL,
	started_at timestamptz NULL,
	completed_at timestamptz NULL,
	claimed_at timestamptz NULL,
	last_progress_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT user_missions_pkey PRIMARY KEY (user_mission_id),
	CONSTRAINT user_missions_progress_check CHECK ((progress >= 0)),
	CONSTRAINT user_missions_user_id_mission_id_key UNIQUE (user_id, mission_id),
	CONSTRAINT user_missions_mission_id_fkey FOREIGN KEY (mission_id) REFERENCES public.missions(mission_id) ON DELETE CASCADE,
	CONSTRAINT user_missions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);
CREATE INDEX idx_user_missions_mission ON public.user_missions USING btree (mission_id);
CREATE INDEX idx_user_missions_status ON public.user_missions USING btree (status);
CREATE INDEX idx_user_missions_user ON public.user_missions USING btree (user_id);

-- Table Triggers

create trigger update_user_missions_last_progress_at before
update
    on
    public.user_missions for each row execute function update_updated_at_column();


-- public.services definition

-- Drop table

-- DROP TABLE public.services;

CREATE TABLE public.services (
	service_id serial4 NOT NULL,
	provider_id int4 NOT NULL, -- Celui qui REND le service (le créancier)
	beneficiary_id int4 NOT NULL, -- Celui qui REÇOIT le service (le débiteur)
	category_id int4 NULL,
	description text NOT NULL,
	jeton_value int4 NOT NULL, -- Nombre de jetons/points de dette
	status public."service_status_enum" DEFAULT 'pending_confirmation'::service_status_enum NOT NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	confirmed_at timestamptz NULL, -- Quand le bénéficiaire confirme
	repaid_at timestamptz NULL,
	repayment_service_id int4 NULL, -- Si remboursé par un autre service
	executed_prank_id_repayment int4 NULL,
	updated_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT check_provider_beneficiary_different CHECK ((provider_id <> beneficiary_id)),
	CONSTRAINT services_jeton_value_check CHECK ((jeton_value > 0)),
	CONSTRAINT services_pkey PRIMARY KEY (service_id),
	CONSTRAINT services_beneficiary_id_fkey FOREIGN KEY (beneficiary_id) REFERENCES public.users(user_id) ON DELETE CASCADE,
	CONSTRAINT services_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.service_categories(category_id) ON DELETE SET NULL,
	CONSTRAINT services_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.users(user_id) ON DELETE CASCADE,
	CONSTRAINT services_repayment_service_id_fkey FOREIGN KEY (repayment_service_id) REFERENCES public.services(service_id) ON DELETE SET NULL
);
CREATE INDEX idx_services_beneficiary ON public.services USING btree (beneficiary_id);
CREATE INDEX idx_services_created_at ON public.services USING btree (created_at);
CREATE INDEX idx_services_provider ON public.services USING btree (provider_id);
CREATE INDEX idx_services_status ON public.services USING btree (status);

-- Column comments

COMMENT ON COLUMN public.services.provider_id IS 'Celui qui REND le service (le créancier)';
COMMENT ON COLUMN public.services.beneficiary_id IS 'Celui qui REÇOIT le service (le débiteur)';
COMMENT ON COLUMN public.services.jeton_value IS 'Nombre de jetons/points de dette';
COMMENT ON COLUMN public.services.confirmed_at IS 'Quand le bénéficiaire confirme';
COMMENT ON COLUMN public.services.repayment_service_id IS 'Si remboursé par un autre service';

-- Table Triggers

create trigger update_services_updated_at before
update
    on
    public.services for each row execute function update_updated_at_column();


-- public.executed_pranks definition

-- Drop table

-- DROP TABLE public.executed_pranks;

CREATE TABLE public.executed_pranks (
	executed_prank_id serial4 NOT NULL,
	service_being_repaid_id int4 NOT NULL, -- Le service/dette que ce prank rembourse
	chosen_prank_id int4 NOT NULL, -- Le prank issu du catalogue
	executor_id int4 NOT NULL, -- L'utilisateur qui exécute le prank (le débiteur)
	target_id int4 NOT NULL, -- L'utilisateur "victime" du prank (le créancier)
	jeton_value_paid int4 NOT NULL, -- Valeur en jetons réellement remboursée par ce prank
	status public."executed_prank_status_enum" NOT NULL,
	proof_url varchar(255) DEFAULT NULL::character varying NULL, -- URL vers la preuve si le prank en nécessite une
	execution_details_json jsonb NULL, -- Détails spécifiques à cette exécution
	executed_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	validated_at timestamptz NULL,
	updated_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT check_executor_target_different CHECK ((executor_id <> target_id)),
	CONSTRAINT executed_pranks_jeton_value_paid_check CHECK ((jeton_value_paid >= 0)),
	CONSTRAINT executed_pranks_pkey PRIMARY KEY (executed_prank_id),
	CONSTRAINT executed_pranks_chosen_prank_id_fkey FOREIGN KEY (chosen_prank_id) REFERENCES public.pranks(prank_id) ON DELETE RESTRICT,
	CONSTRAINT executed_pranks_executor_id_fkey FOREIGN KEY (executor_id) REFERENCES public.users(user_id) ON DELETE CASCADE,
	CONSTRAINT executed_pranks_service_being_repaid_id_fkey FOREIGN KEY (service_being_repaid_id) REFERENCES public.services(service_id) ON DELETE CASCADE,
	CONSTRAINT executed_pranks_target_id_fkey FOREIGN KEY (target_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);
CREATE INDEX idx_executed_pranks_chosen_prank ON public.executed_pranks USING btree (chosen_prank_id);
CREATE INDEX idx_executed_pranks_executor ON public.executed_pranks USING btree (executor_id);
CREATE INDEX idx_executed_pranks_service ON public.executed_pranks USING btree (service_being_repaid_id);
CREATE INDEX idx_executed_pranks_status ON public.executed_pranks USING btree (status);
CREATE INDEX idx_executed_pranks_target ON public.executed_pranks USING btree (target_id);

-- Column comments

COMMENT ON COLUMN public.executed_pranks.service_being_repaid_id IS 'Le service/dette que ce prank rembourse';
COMMENT ON COLUMN public.executed_pranks.chosen_prank_id IS 'Le prank issu du catalogue';
COMMENT ON COLUMN public.executed_pranks.executor_id IS 'L''utilisateur qui exécute le prank (le débiteur)';
COMMENT ON COLUMN public.executed_pranks.target_id IS 'L''utilisateur "victime" du prank (le créancier)';
COMMENT ON COLUMN public.executed_pranks.jeton_value_paid IS 'Valeur en jetons réellement remboursée par ce prank';
COMMENT ON COLUMN public.executed_pranks.proof_url IS 'URL vers la preuve si le prank en nécessite une';
COMMENT ON COLUMN public.executed_pranks.execution_details_json IS 'Détails spécifiques à cette exécution';

-- Table Triggers

create trigger update_executed_pranks_updated_at before
update
    on
    public.executed_pranks for each row execute function update_updated_at_column();

-- Add missing foreign key constraint for services table
ALTER TABLE public.services ADD CONSTRAINT fk_services_executed_prank FOREIGN KEY (executed_prank_id_repayment) REFERENCES public.executed_pranks(executed_prank_id) ON DELETE SET NULL; 