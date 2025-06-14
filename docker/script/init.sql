-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA public IS 'standard public schema';

-- DROP TYPE public."currency_type_enum";

CREATE TYPE public."currency_type_enum" AS ENUM (
	'game_coins',
	'premium_gems',
	'jetons');

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

-- DROP TYPE public."pack_type_enum";

CREATE TYPE public."pack_type_enum" AS ENUM (
	'basic',
	'event',
	'limited',
	'gift',
	'promotional');

-- DROP TYPE public."prank_rarity_enum";

CREATE TYPE public."prank_rarity_enum" AS ENUM (
	'common',
	'rare',
	'extreme');

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
-- DROP SEQUENCE public.executed_pranks_executed_prank_id_seq1;

CREATE SEQUENCE public.executed_pranks_executed_prank_id_seq1
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
-- DROP SEQUENCE public.friendships_friendship_id_seq1;

CREATE SEQUENCE public.friendships_friendship_id_seq1
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
-- DROP SEQUENCE public.missions_mission_id_seq1;

CREATE SEQUENCE public.missions_mission_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.pack_opening_log_log_id_seq;

CREATE SEQUENCE public.pack_opening_log_log_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.prank_packs_pack_id_seq;

CREATE SEQUENCE public.prank_packs_pack_id_seq
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
-- DROP SEQUENCE public.pranks_prank_id_seq1;

CREATE SEQUENCE public.pranks_prank_id_seq1
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
-- DROP SEQUENCE public.service_categories_category_id_seq1;

CREATE SEQUENCE public.service_categories_category_id_seq1
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
-- DROP SEQUENCE public.services_service_id_seq1;

CREATE SEQUENCE public.services_service_id_seq1
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
-- DROP SEQUENCE public.user_missions_user_mission_id_seq1;

CREATE SEQUENCE public.user_missions_user_mission_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.user_pack_inventory_user_pack_inventory_id_seq;

CREATE SEQUENCE public.user_pack_inventory_user_pack_inventory_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.user_pranks_user_prank_id_seq;

CREATE SEQUENCE public.user_pranks_user_prank_id_seq
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
-- DROP SEQUENCE public.users_user_id_seq1;

CREATE SEQUENCE public.users_user_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- public.prank_packs definition

-- Drop table

-- DROP TABLE public.prank_packs;

CREATE TABLE public.prank_packs (
	pack_id serial4 NOT NULL,
	"name" varchar(100) NOT NULL,
	description text NULL,
	image_url varchar(255) NULL,
	cost_currency_type public."currency_type_enum" NOT NULL, -- The type of currency required to obtain this pack.
	cost_amount int4 NOT NULL, -- The amount of the specified currency required.
	number_of_pranks_awarded int4 DEFAULT 1 NOT NULL, -- How many pranks are awarded when this pack is opened.
	rarity_probabilities jsonb NOT NULL, -- JSON object defining the probability for each prank rarity. E.g., {"common": 0.7, "rare": 0.25, "extreme": 0.05}. Keys must match public.prank_rarity_enum values.
	is_available bool DEFAULT true NULL,
	available_from timestamptz NULL,
	available_until timestamptz NULL,
	required_user_level int4 DEFAULT 0 NULL, -- Minimum user level (from public.users.level) to acquire/open this pack.
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	updated_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	pack_type public."pack_type_enum" DEFAULT 'basic'::pack_type_enum NOT NULL, -- Categorizes the type of pack (e.g., basic, event, limited).
	CONSTRAINT prank_packs_cost_amount_check CHECK ((cost_amount >= 0)),
	CONSTRAINT prank_packs_name_key UNIQUE (name),
	CONSTRAINT prank_packs_number_of_pranks_awarded_check CHECK ((number_of_pranks_awarded > 0)),
	CONSTRAINT prank_packs_pkey PRIMARY KEY (pack_id),
	CONSTRAINT prank_packs_required_user_level_check CHECK ((required_user_level >= 0))
);
CREATE INDEX idx_prank_packs_cost_currency_type ON public.prank_packs USING btree (cost_currency_type);
CREATE INDEX idx_prank_packs_is_available ON public.prank_packs USING btree (is_available);
COMMENT ON TABLE public.prank_packs IS 'Defines different types of prank packs (cases/boxes) available for users to open.';

-- Column comments

COMMENT ON COLUMN public.prank_packs.cost_currency_type IS 'The type of currency required to obtain this pack.';
COMMENT ON COLUMN public.prank_packs.cost_amount IS 'The amount of the specified currency required.';
COMMENT ON COLUMN public.prank_packs.number_of_pranks_awarded IS 'How many pranks are awarded when this pack is opened.';
COMMENT ON COLUMN public.prank_packs.rarity_probabilities IS 'JSON object defining the probability for each prank rarity. E.g., {"common": 0.7, "rare": 0.25, "extreme": 0.05}. Keys must match public.prank_rarity_enum values.';
COMMENT ON COLUMN public.prank_packs.required_user_level IS 'Minimum user level (from public.users.level) to acquire/open this pack.';
COMMENT ON COLUMN public.prank_packs.pack_type IS 'Categorizes the type of pack (e.g., basic, event, limited).';

-- Table Triggers

create trigger trigger_update_prank_packs_updated_at before
update
    on
    public.prank_packs for each row execute function update_updated_at_column();

INSERT INTO public.prank_packs ("name",description,image_url,cost_currency_type,cost_amount,number_of_pranks_awarded,rarity_probabilities,is_available,available_from,available_until,required_user_level,created_at,updated_at,pack_type) VALUES
	 ('Starter Prank Kit','A basic pack great for new pranksters. Contains one prank, mostly common.','img/packs/starter_kit.png','game_coins'::public."currency_type_enum",100,10,'{"basic": {"rare": 0.14, "common": 0.85, "extreme": 0.01}}',true,'2025-06-08 18:09:13.608+02','2027-06-08 18:09:13.608+02',1,'2025-06-08 18:09:13.608868+02','2025-06-10 01:08:44.698197+02','basic'::public."pack_type_enum"),
	 ('Limited Edition Trickster Trove','A special event pack, available for a short time! Contains two pranks.','img/packs/trickster_trove.png','game_coins'::public."currency_type_enum",750,20,'{"basic": {"rare": 0.45, "common": 0.40, "extreme": 0.15}, "last_card": {"rare": 0.45, "common": 0.40, "extreme": 0.15}}',true,'2025-06-08 18:09:13.608+02','2027-06-08 18:09:13.608+02',10,'2025-06-08 18:09:13.608868+02','2025-06-10 01:08:44.698197+02','basic'::public."pack_type_enum"),
	 ('Pocketful of Mischief','A cheap and cheerful pack with one prank. You might get lucky!','img/packs/pocket_mischief.png','game_coins'::public."currency_type_enum",75,51,'{"basic": {"rare": 0.30, "common": 0.65, "extreme": 0.05}}',true,NULL,NULL,1,'2025-06-08 20:07:52.099915+02','2025-06-10 01:08:44.698197+02','basic'::public."pack_type_enum"),
	 ('Grand Jester''s Hoard (MEGA)','For the serious prankster! Four pranks with excellent odds for Rare and Extreme.','img/packs/grand_jesters_hoard.png','game_coins'::public."currency_type_enum",600,10,'{"basic": {"rare": 0.50, "common": 0.25, "extreme": 0.25}, "last_card": {"rare": 0.50, "common": 0.25, "extreme": 0.25}}',true,NULL,NULL,12,'2025-06-08 20:07:52.099915+02','2025-06-10 01:08:44.698197+02','basic'::public."pack_type_enum"),
	 ('Novice Joker''s Kit','A small pack for beginners, containing one common or rare prank.','img/packs/novice_kit.png','game_coins'::public."currency_type_enum",50,10,'{"basic": {"rare": 0.10, "common": 0.90, "extreme": 0.00}}',true,NULL,NULL,1,'2025-06-08 20:07:52.099915+02','2025-06-10 01:08:44.698197+02','basic'::public."pack_type_enum"),
	 ('Chaos Creator Crate','The ultimate crate! Three pranks with the highest chance for Extreme mischief.','img/packs/chaos_creator_crate.png','premium_gems'::public."currency_type_enum",50,20,'{"basic": {"rare": 0.50, "common": 0.20, "extreme": 0.30}, "last_card": {"rare": 0.50, "common": 0.20, "extreme": 0.30}}',true,NULL,NULL,1,'2025-06-08 20:07:52.099915+02','2025-06-10 01:08:44.698197+02','basic'::public."pack_type_enum"),
	 ('Chest of Utter Chaos','A premium pack with the highest odds for Extreme pranks. Contains one prank.','img/packs/chaos_chest.png','game_coins'::public."currency_type_enum",50,51,'{"basic": {"rare": 0.60, "common": 0.10, "extreme": 0.30}}',true,'2025-06-08 18:09:13.608+02','2027-06-08 18:09:13.608+02',1,'2025-06-08 18:09:13.608868+02','2025-06-10 01:08:44.698197+02','basic'::public."pack_type_enum"),
	 ('Mischief Maker''s Box','Contains three pranks with a better chance for rare finds!','img/packs/mischief_box.png','game_coins'::public."currency_type_enum",450,20,'{"basic": {"rare": 0.35, "common": 0.60, "extreme": 0.05}, "last_card": {"rare": 0.35, "common": 0.60, "extreme": 0.05}}',true,'2025-06-08 18:09:13.608+02','2027-06-08 18:09:13.608+02',1,'2025-06-08 18:09:13.608868+02','2025-06-10 01:08:44.698197+02','basic'::public."pack_type_enum"),
	 ('Apprentice Prankster Pouch','A step up! One prank with a better chance for Rare.','img/packs/apprentice_pouch.png','game_coins'::public."currency_type_enum",100,51,'{"basic": {"rare": 0.23, "common": 0.75, "extreme": 0.02}}',true,NULL,NULL,3,'2025-06-08 20:07:52.099915+02','2025-06-10 01:08:44.698197+02','basic'::public."pack_type_enum"),
	 ('Trickster''s Trio','Three pranks in one! Good odds for a mix of fun.','img/packs/tricksters_trio.png','game_coins'::public."currency_type_enum",250,10,'{"basic": {"rare": 0.35, "common": 0.60, "extreme": 0.05}, "last_card": {"rare": 0.35, "common": 0.60, "extreme": 0.05}}',true,NULL,NULL,5,'2025-06-08 20:07:52.099915+02','2025-06-10 01:08:44.698197+02','basic'::public."pack_type_enum");
INSERT INTO public.prank_packs ("name",description,image_url,cost_currency_type,cost_amount,number_of_pranks_awarded,rarity_probabilities,is_available,available_from,available_until,required_user_level,created_at,updated_at,pack_type) VALUES
	 ('Gaggle of Guffaws Pack','Two pranks with an increased chance for Rare and a shot at Extreme!','img/packs/gaggle_guffaws.png','game_coins'::public."currency_type_enum",180,20,'{"basic": {"rare": 0.40, "common": 0.50, "extreme": 0.10}, "last_card": {"rare": 0.40, "common": 0.50, "extreme": 0.10}}',true,NULL,NULL,7,'2025-06-08 20:07:52.099915+02','2025-06-10 01:08:44.698197+02','basic'::public."pack_type_enum"),
	 ('Shenanigan Starter Set (MEGA)','A massive haul of FIVE pranks! Great for stocking up.','img/packs/shenanigan_mega.png','game_coins'::public."currency_type_enum",500,51,'{"basic": {"rare": 0.45, "common": 0.40, "extreme": 0.15}, "last_card": {"rare": 0.45, "common": 0.40, "extreme": 0.15}}',true,NULL,NULL,10,'2025-06-08 20:07:52.099915+02','2025-06-10 01:08:44.698197+02','basic'::public."pack_type_enum"),
	 ('April Fools'' Frenzy Pack (LIMITED)','A special pack available only around April 1st! Contains two high-value pranks.','img/packs/april_fools_limited.png','game_coins'::public."currency_type_enum",300,10,'{"basic": {"rare": 0.50, "common": 0.30, "extreme": 0.20}, "last_card": {"rare": 0.50, "common": 0.30, "extreme": 0.20}}',true,'2024-03-29 01:00:00+01','2024-04-03 01:59:59+02',5,'2025-06-08 20:07:52.099915+02','2025-06-10 01:08:44.698197+02','basic'::public."pack_type_enum"),
	 ('Daily Deal Delight','A special pack available once a day! Contains one random prank.','img/packs/daily_delight.png','game_coins'::public."currency_type_enum",50,51,'{"basic": {"rare": 0.20, "common": 0.70, "extreme": 0.10}}',true,NULL,NULL,0,'2025-06-09 19:01:32.190331+02','2025-06-10 01:08:44.698197+02','event'::public."pack_type_enum"),
	 ('Weekend Warrior Bundle','Boost your weekend! Three pranks with good odds.','img/packs/weekend_warrior.png','premium_gems'::public."currency_type_enum",100,20,'{"basic": {"rare": 0.30, "common": 0.60, "extreme": 0.10}, "last_card": {"rare": 0.30, "common": 0.60, "extreme": 0.10}}',true,'2024-07-01 02:00:00+02','2026-01-01 00:59:59+01',5,'2025-06-09 19:01:32.190331+02','2025-06-10 01:08:44.698197+02','limited'::public."pack_type_enum"),
	 ('Promotional Prankster Pack','A special promotional offer containing a single surprising prank!','img/packs/promo_prankster.png','game_coins'::public."currency_type_enum",25,10,'{"basic": {"rare": 0.15, "common": 0.80, "extreme": 0.05}}',true,'2024-08-01 02:00:00+02','2024-09-01 01:59:59+02',1,'2025-06-09 19:01:32.190331+02','2025-06-10 01:08:44.698197+02','promotional'::public."pack_type_enum"),
	 ('Event Exclusive Duo','Two pranks available only during the Summer Shenanigans event! First card has a higher chance for Extreme.','img/packs/event_duo.png','premium_gems'::public."currency_type_enum",75,51,'{"basic": {"rare": 0.40, "common": 0.30, "extreme": 0.30}, "last_card": {"rare": 0.50, "common": 0.40, "extreme": 0.10}}',true,'2024-07-15 14:00:00+02','2024-07-22 14:00:00+02',8,'2025-06-09 19:01:32.190331+02','2025-06-10 01:08:44.698197+02','event'::public."pack_type_enum"),
	 ('Welcome Gift Pack','A free welcome gift for all new pranksters! Contains one common prank to get you started.','img/packs/welcome_gift.png','game_coins'::public."currency_type_enum",0,10,'{"basic": {"rare": 0.05, "common": 0.95, "extreme": 0.00}}',true,NULL,NULL,0,'2025-06-09 19:01:32.190331+02','2025-06-10 01:08:44.698197+02','gift'::public."pack_type_enum"),
	 ('The Lucky Shot','Just one prank, but with a fantastic chance of it being Rare or Extreme! Feeling lucky?','img/packs/lucky_shot.png','game_coins'::public."currency_type_enum",150,20,'{"basic": {"rare": 0.60, "common": 0.10, "extreme": 0.30}}',true,NULL,NULL,NULL,'2025-06-08 20:07:52.099915+02','2025-06-10 01:08:44.698197+02','basic'::public."pack_type_enum"),
	 ('Jester''s Quartet','Four pranks with a decent mix of rarities. A solid choice for expanding your collection.','img/packs/jesters_quartet.png','game_coins'::public."currency_type_enum",350,20,'{"basic": {"rare": 0.25, "common": 0.65, "extreme": 0.10}, "last_card": {"rare": 0.30, "common": 0.50, "extreme": 0.20}}',true,NULL,NULL,3,'2025-06-09 19:01:32.190331+02','2025-06-10 01:08:44.698197+02','basic'::public."pack_type_enum");
INSERT INTO public.prank_packs ("name",description,image_url,cost_currency_type,cost_amount,number_of_pranks_awarded,rarity_probabilities,is_available,available_from,available_until,required_user_level,created_at,updated_at,pack_type) VALUES
	 ('Flash Sale Extreme Shot','Limited time flash sale! One prank with an unusually high chance for an Extreme result.','img/packs/flash_extreme.png','premium_gems'::public."currency_type_enum",60,51,'{"basic": {"rare": 0.20, "common": 0.40, "extreme": 0.40}}',true,'2025-06-10 19:01:32.190331+02','2025-06-12 19:01:32.190331+02',10,'2025-06-09 19:01:32.190331+02','2025-06-10 01:08:44.698197+02','limited'::public."pack_type_enum"),
	 ('Influencer Collab Pack','A special pack from your favorite prank influencer! Two pranks, the last one guaranteed Rare or better.','img/packs/influencer_collab.png','game_coins'::public."currency_type_enum",200,20,'{"basic": {"rare": 0.30, "common": 0.60, "extreme": 0.10}, "last_card": {"rare": 0.70, "common": 0.00, "extreme": 0.30}}',true,'2024-09-01 02:00:00+02','2024-09-16 01:59:59+02',2,'2025-06-09 19:01:32.190331+02','2025-06-10 01:08:44.698197+02','promotional'::public."pack_type_enum"),
	 ('Loyalty Reward Prank','A small token of our appreciation for loyal players. One guaranteed common prank.','img/packs/loyalty_reward.png','game_coins'::public."currency_type_enum",10,10,'{"basic": {"rare": 0.01, "common": 0.99, "extreme": 0.00}}',true,NULL,NULL,0,'2025-06-09 19:01:32.190331+02','2025-06-10 01:08:44.698197+02','gift'::public."pack_type_enum"),
	 ('Anniversary Extravaganza Chest','Celebrate with us! A massive chest of FIVE pranks, each with premium odds for Extreme outcomes. Final card is a jackpot!','img/packs/anniversary_chest.png','premium_gems'::public."currency_type_enum",500,51,'{"basic": {"rare": 0.40, "common": 0.20, "extreme": 0.40}, "last_card": {"rare": 0.30, "common": 0.10, "extreme": 0.60}}',true,'2025-01-01 01:00:00+01','2025-02-01 00:59:59+01',15,'2025-06-09 19:01:32.190331+02','2025-06-10 01:08:44.698197+02','event'::public."pack_type_enum");


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
	image_url varchar(255) NULL,
	rarity public."prank_rarity_enum" DEFAULT 'common'::prank_rarity_enum NOT NULL,
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

INSERT INTO public.pranks ("name",description,default_jeton_cost_equivalent,xp_reward_executor,xp_reward_target,coins_reward_executor,coins_reward_target,"type",config_details_json,requires_proof,is_active,created_at,image_url,rarity) VALUES
	 ('Min Brightness Stealth','Is the screen even on? It''s so dark!',5,3,1,0,0,'declarative'::public."prank_type_enum",'{"brightness_level": "min"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/common/card-common (6).png','common'::public."prank_rarity_enum"),
	 ('Silly Animal Ringtone','BAA! Incoming call! (Changes ringtone to a goat scream or similar).',6,4,2,1,0,'declarative'::public."prank_type_enum",'{"ringtone_sound": "goat_scream"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/common/card-common (7).png','common'::public."prank_rarity_enum"),
	 ('Wi-Fi Amnesia','Why won''t my phone connect to Wi-Fi anymore? (Forgets a key Wi-Fi network).',7,4,2,0,0,'declarative'::public."prank_type_enum",'{"wifi_action": "forget_network"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/common/card-common (9).png','common'::public."prank_rarity_enum"),
	 ('Potato Phone Nickname','My device is now officially a "Potato Phone" (Changes phone name in settings).',5,3,1,0,0,'declarative'::public."prank_type_enum",'{"new_phone_name": "Potato Phone"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/common/card-common (10).png','common'::public."prank_rarity_enum"),
	 ('Ghost Voicemail','You have one new (non-existent) voicemail!',4,2,1,0,0,'notification_spam'::public."prank_type_enum",'{"notification_type": "fake_voicemail"}',false,true,'2025-06-08 15:45:39.891114+02','assets/card/common/card-common (11).png','common'::public."prank_rarity_enum"),
	 ('Quick Screen Timeout','The screen keeps turning off so fast! (Sets screen timeout to 15 seconds).',6,4,2,1,0,'declarative'::public."prank_type_enum",'{"screen_timeout": "15s"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/common/card-common (12).png','common'::public."prank_rarity_enum"),
	 ('Inverted Colors Flash','Whoa, all the colors are flipped and psychedelic! (Inverts screen colors).',7,4,2,1,0,'declarative'::public."prank_type_enum",'{"screen_effect": "invert_colors"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/common/card-common (13).png','common'::public."prank_rarity_enum"),
	 ('Do Not Disturb On','Why am I not getting any notifications? (Turns Do Not Disturb On).',8,5,2,1,0,'declarative'::public."prank_type_enum",'{"toggle_setting": "dnd_on"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/common/card-common (14).png','common'::public."prank_rarity_enum"),
	 ('Imaginary Fish Feeding Reminder','Don''t forget to feed Bubbles! (Adds a recurring fake calendar event).',5,3,1,0,0,'declarative'::public."prank_type_enum",'{"recurrence": "daily", "calendar_event": "Feed imaginary fish"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/common/card-common (15).png','common'::public."prank_rarity_enum"),
	 ('Vague Emoji Barrage','What could 👽🤷‍♂️🍕 possibly mean? (Sends a series of cryptic emojis).',4,2,1,0,0,'declarative'::public."prank_type_enum",'{"message_content": "👽🤷‍♂️🍕✨"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/common/card-common (16).png','common'::public."prank_rarity_enum");
INSERT INTO public.pranks ("name",description,default_jeton_cost_equivalent,xp_reward_executor,xp_reward_target,coins_reward_executor,coins_reward_target,"type",config_details_json,requires_proof,is_active,created_at,image_url,rarity) VALUES
	 ('Clock Format Flip','Is it 2 PM or 14:00? (Switches between 12-hr and 24-hr clock format).',5,3,1,0,0,'declarative'::public."prank_type_enum",'{"clock_format_action": "toggle"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/common/card-common (17).png','common'::public."prank_rarity_enum"),
	 ('Instagram Blockade (Temporary)','Instagram won''t load! The horror! (Simulates app block or guides user to temp block it).',25,15,5,5,2,'declarative'::public."prank_type_enum",'{"app_to_block": "Instagram", "duration_minutes": 5}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/rare/card-rare (1).png','rare'::public."prank_rarity_enum"),
	 ('Monochrome Mode','Everything''s suddenly black and white, like an old movie! (Turns screen to monochrome)',8,5,2,1,0,'declarative'::public."prank_type_enum",'{"screen_effect": "monochrome"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/common/card-common (2).png','common'::public."prank_rarity_enum"),
	 ('Contact Name Anarchy','Why is ''The Supreme Overlord'' calling me? (Changes one important contact name).',30,18,6,6,2,'declarative'::public."prank_type_enum",'{"contact_to_edit": "Mom|Dad|Boss", "new_name_options": ["The Supreme Overlord", "My Humble Servant"]}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/rare/card-rare (3).png','rare'::public."prank_rarity_enum"),
	 ('Alarm Symphony of Annoyance','The symphony of never-ending alarms (Sets 5 alarms for slightly different, annoying times).',35,20,7,7,3,'declarative'::public."prank_type_enum",'{"alarm_count": 5, "alarm_interval_minutes": 1, "start_time_offset_minutes": 1}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/rare/card-rare (4).png','rare'::public."prank_rarity_enum"),
	 ('Autocorrect Rebellion','My phone has a mind of its own when I type (Autocorrects "yes" to "maybe, I guess?" and "no" to "absolutely, positively!").',40,22,8,8,3,'declarative'::public."prank_type_enum",'{"autocorrect_maps": [{"to": "maybe, I guess?", "from": "yes"}, {"to": "absolutely, positively!", "from": "no"}]}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/rare/card-rare (5).png','rare'::public."prank_rarity_enum"),
	 ('Prankster Wallpaper Takeover','Surprise! My face is your new background (Changes wallpaper to a goofy photo of the prankster).',25,15,5,5,2,'declarative'::public."prank_type_enum",'{"wallpaper_type": "prankster_face"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/rare/card-rare (6).png','rare'::public."prank_rarity_enum"),
	 ('Giant Text Mode','EVERYTHING IS SO BIG NOW! (Turns on "Large Text" or max font size).',20,12,4,4,1,'declarative'::public."prank_type_enum",'{"font_size": "max"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/rare/card-rare (7).png','rare'::public."prank_rarity_enum"),
	 ('Rubber Duck Browser Invasion','Why are there so many ducks on my internet? (Opens 20 browser tabs of rubber ducks).',30,18,6,6,2,'declarative'::public."prank_type_enum",'{"tab_count": 20, "browser_tabs_url": "search_images_rubber_duck"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/rare/card-rare (8).png','rare'::public."prank_rarity_enum"),
	 ('Fake Celebrity Call','OMG! [Celebrity Name] is calling me?! (Not really) (Simulates incoming call screen).',35,20,7,7,3,'declarative'::public."prank_type_enum",'{"caller_name_options": ["Ryan Reynolds", "Zendaya", "Local Mayor"]}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/rare/card-rare (9).png','rare'::public."prank_rarity_enum");
INSERT INTO public.pranks ("name",description,default_jeton_cost_equivalent,xp_reward_executor,xp_reward_target,coins_reward_executor,coins_reward_target,"type",config_details_json,requires_proof,is_active,created_at,image_url,rarity) VALUES
	 ('Ominous Lock Screen Message','Lock screen message changed to "I Know Your Wi-Fi Password".',25,15,5,5,2,'declarative'::public."prank_type_enum",'{"lock_screen_message": "I Know Your Wi-Fi Password 👀"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/rare/card-rare (10).png','rare'::public."prank_rarity_enum"),
	 ('Useless App Icon','This new app doesn''t seem to work... (Creates a fake app icon that does nothing or opens a funny image).',28,16,5,5,2,'declarative'::public."prank_type_enum",'{"fake_app_name": "Super Secret Tool", "action_on_open": "rickroll_image"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/rare/card-rare (11).png','rare'::public."prank_rarity_enum"),
	 ('Extreme Cuteness Weather Alert','Warning: Dangerously high levels of adorable in your area (Sends fake weather alert).',22,14,4,4,1,'notification_spam'::public."prank_type_enum",'{"alert_body": "Extreme levels of adorable puppies detected in your vicinity. Proceed with caution (and squeals).", "alert_title": "Cuteness Overload Warning"}',false,true,'2025-06-08 15:45:39.891114+02','assets/card/rare/card-rare (12).png','rare'::public."prank_rarity_enum"),
	 ('Phantom Low Battery','Panic! My battery is dying at 1%... or is it? (Sends fake low battery notification).',20,12,4,4,1,'notification_spam'::public."prank_type_enum",'{"notification_body": "1% remaining. Connect charger immediately.", "notification_title": "Battery Critically Low"}',false,true,'2025-06-08 15:45:39.891114+02','assets/card/rare/card-rare (2).png','rare'::public."prank_rarity_enum"),
	 ('Max Brightness Attack','Suddenly, the phone screen is blindingly bright.',5,3,1,0,0,'declarative'::public."prank_type_enum",'{"brightness_level": "max"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/common/card-common (5).png','common'::public."prank_rarity_enum"),
	 ('Cracked Screen Wallpaper','Oops! Looks like the screen is shattered (it''s just a picture for the wallpaper).',7,4,2,1,0,'declarative'::public."prank_type_enum",'{"wallpaper_type": "cracked_screen"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/common/card-common (4).png','common'::public."prank_rarity_enum"),
	 ('Airplane Mode Surprise','No signal? What happened to the internet? (Toggles Airplane Mode on).',8,5,2,1,0,'declarative'::public."prank_type_enum",'{"toggle_setting": "airplane_mode_on"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/common/card-common (8).png','common'::public."prank_rarity_enum"),
	 ('Temporary Gibberish Keyboard','Suddenly typing in Cyrillic or Greek letters for 1 minute.',40,22,8,8,3,'declarative'::public."prank_type_enum",'{"duration_seconds": 60, "keyboard_language_options": ["Cyrillic", "Greek", "Emoji-Only"]}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/rare/card-rare (17).png','rare'::public."prank_rarity_enum"),
	 ('Frozen Home Screen Illusion','My apps are frozen! I can''t click anything! (Screenshot home, set as wallpaper, hide all icons).',120,60,20,20,8,'declarative'::public."prank_type_enum",'{"action": "home_screen_freeze_illusion"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/extreme/card-extreme (2).png','extreme'::public."prank_rarity_enum"),
	 ('Hide Vital App','Where did my calculator app go? (Hides one frequently used app like Calculator or Weather).',33,19,6,7,2,'declarative'::public."prank_type_enum",'{"app_to_hide_options": ["Calculator", "Weather", "Notes"]}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/rare/card-rare (14).png','rare'::public."prank_rarity_enum");
INSERT INTO public.pranks ("name",description,default_jeton_cost_equivalent,xp_reward_executor,xp_reward_target,coins_reward_executor,coins_reward_target,"type",config_details_json,requires_proof,is_active,created_at,image_url,rarity) VALUES
	 ('Ghost Typer','Words magically appear on screen as they type or watch (Requires remote access or tricky timing).',150,70,25,25,10,'declarative'::public."prank_type_enum",'{"typing_speed": "slow", "message_to_type": "I see you..."}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/extreme/card-extreme (1).png','extreme'::public."prank_rarity_enum"),
	 ('Potato Appocalypse','My phone is now entirely potato-themed (Changes ALL app icons to pictures of potatoes).',130,65,22,22,9,'declarative'::public."prank_type_enum",'{"new_icon_theme": "potato_faces"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/extreme/card-extreme (3).png','extreme'::public."prank_rarity_enum"),
	 ('Fake Cuteness Virus Alert','Warning! Cuteness overload detected! Options: ''Embrace it'' or ''Try to resist'' (Full screen fake alert).',100,50,15,15,5,'notification_spam'::public."prank_type_enum",'{"body": "Your system has been infected with extreme cuteness. Recommended action: Awwee.", "title": "VIRUS: Cuteness Overload!", "options": ["Embrace it", "Try to Resist (Futility is Fun)"], "alert_type": "full_screen_modal"}',false,true,'2025-06-08 15:45:39.891114+02','assets/card/extreme/card-extreme (4).png','extreme'::public."prank_rarity_enum"),
	 ('Mysterious Jitters','My phone has the mysterious vibrating jitters (Continuously triggers short, random vibrations).',110,55,18,18,7,'declarative'::public."prank_type_enum",'{"duration_minutes": 5, "vibration_pattern": "random_short_bursts"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/extreme/card-extreme (5).png','extreme'::public."prank_rarity_enum"),
	 ('Robotic Notification Announcer','INCOMING MESSAGE FROM... MOM. MESSAGE READS... (Activates Text-to-Speech for ALL notifications in a robot voice).',140,68,24,24,9,'declarative'::public."prank_type_enum",'{"voice": "robot", "tts_setting": "all_notifications"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/extreme/card-extreme (6).png','extreme'::public."prank_rarity_enum"),
	 ('Fake Self-Destruct Sequence','10... 9... 8... (A fake phone self-destruct countdown timer appears, does nothing at zero).',100,50,15,15,5,'notification_spam'::public."prank_type_enum",'{"on_zero_action_message": "Just kidding! Gotcha!", "countdown_duration_seconds": 10}',false,true,'2025-06-08 15:45:39.891114+02','assets/card/extreme/card-extreme (7).png','extreme'::public."prank_rarity_enum"),
	 ('The Chosen One Autocorrect','Every time they type their name, it becomes "The Chosen One".',120,60,20,20,8,'declarative'::public."prank_type_enum",'{"replacement_text": "The Chosen One", "autocorrect_target": "user_name"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/extreme/card-extreme (8).png','extreme'::public."prank_rarity_enum"),
	 ('Snail Speed Animations','Opening apps now takes... for... ev... er (Slows down all phone animations to a crawl).',130,65,22,22,9,'declarative'::public."prank_type_enum",'{"animation_speed_multiplier": "0.1x"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/extreme/card-extreme (9).png','extreme'::public."prank_rarity_enum"),
	 ('App-Specific Record Scratch','Every time they open TikTok... SKRRRTCH! (Plays a sudden "record scratch" sound for a specific app opening).',110,55,18,18,7,'declarative'::public."prank_type_enum",'{"target_app": "TikTok", "sound_effect": "record_scratch.mp3"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/extreme/card-extreme (10).png','extreme'::public."prank_rarity_enum"),
	 ('Sock Gallery Invasion','Why do I have so many pictures of this one sock? (Fills gallery with 10 identical sock pics).',110,55,18,20,7,'declarative'::public."prank_type_enum",'{"action_description": "User must manually add 10 identical pictures of a single sock to the target''s photo gallery.", "proof_required_description": "Screenshot of gallery showing multiple sock pictures."}',true,true,'2025-06-08 16:11:08.524701+02','assets/card/extreme/card-extreme (11).png','extreme'::public."prank_rarity_enum");
INSERT INTO public.pranks ("name",description,default_jeton_cost_equivalent,xp_reward_executor,xp_reward_target,coins_reward_executor,coins_reward_target,"type",config_details_json,requires_proof,is_active,created_at,image_url,rarity) VALUES
	 ('Fake Fame Flood','My phone is blowing up with (fake) popularity! (Rapid-fire fake social/work notifications).',130,65,22,24,9,'notification_spam'::public."prank_type_enum",'{"burst_count": 5, "interval_ms": 500, "notifications": [{"body": "Your latest post is a hit!", "icon": "like_icon", "title": "New Like!"}, {"body": "@MysteriousFan just followed you!", "icon": "follower_icon", "title": "New Follower!"}, {"body": "URGENT: Need those reports ASAP!", "icon": "boss_icon", "title": "Message from Boss!"}, {"body": "InfluencerX wants to connect!", "icon": "friend_request_icon", "title": "Friend Request"}, {"body": "Your video is trending!", "icon": "trending_icon", "title": "Viral Alert!"}], "delivery_method": "rapid_burst"}',false,true,'2025-06-08 16:11:08.524701+02','assets/card/extreme/card-extreme (12).png','extreme'::public."prank_rarity_enum"),
	 ('Pocket Rave','Rave mode activated unexpectedly! (Screen flashes bright colors for 5 seconds).',100,50,16,18,6,'declarative'::public."prank_type_enum",'{"action_description": "User must find a way to make the target''s phone screen flash multiple bright colors rapidly for approximately 5 seconds (e.g., using an app, accessibility feature, or a quickly swiped full-screen color video).", "proof_required_description": "Video of the target''s phone screen flashing colors."}',true,true,'2025-06-08 16:11:08.524701+02','assets/card/extreme/card-extreme (13).png','extreme'::public."prank_rarity_enum"),
	 ('Malfunctioning AI Helper','A ''helpful'' AI starts giving hilariously wrong advice via notifications ("To make toast, preheat oven to 500°F and insert bread for 2 hours.").',125,62,20,22,8,'notification_spam'::public."prank_type_enum",'{"ai_name": "ClankyAI", "messages": ["ClankyAI: Reminder - The best way to sort socks is by throwing them all in one drawer.", "ClankyAI: To improve focus, try listening to three songs simultaneously.", "ClankyAI: For a healthy diet, ensure you eat at least one full-sized crayon daily.", "ClankyAI: Feeling stressed? Try screaming into a pillow. Your pillow loves it.", "ClankyAI: Pro tip: If your code doesn''t work, try adding more semicolons everywhere."], "total_messages": 5, "interval_minutes_between_messages": 15}',false,true,'2025-06-08 16:11:08.524701+02','assets/card/extreme/card-extreme (14).png','extreme'::public."prank_rarity_enum"),
	 ('Daily Sloth Facts Subscription','"Sign them up" for daily (fake) "Sloth Facts" notifications.',25,15,5,5,2,'notification_spam'::public."prank_type_enum",'{"sample_fact": "Sloths can hold their breath longer than dolphins!", "subscription_topic": "Daily Sloth Facts"}',false,true,'2025-06-08 15:45:39.891114+02','assets/card/rare/card-rare (15).png','rare'::public."prank_rarity_enum"),
	 ('Fake Critical Message Delivery Fail','Oh no, my crucial (fake) message about "Urgent: Free Pizza" didn''t send!',20,12,4,4,1,'notification_spam'::public."prank_type_enum",'{"error_message": "Message delivery failed. Recipient may be too cool.", "failed_message_subject": "Urgent: Free Pizza Tomorrow!"}',false,true,'2025-06-08 15:45:39.891114+02','assets/card/rare/card-rare (16).png','rare'::public."prank_rarity_enum"),
	 ('Compliment Barrage','You have excellent taste in memes! (Phone sends random, slightly off, or overly enthusiastic compliments via notification).',115,58,19,21,8,'notification_spam'::public."prank_type_enum",'{"compliments": ["Your ability to breathe is truly inspiring!", "You click buttons with such grace!", "The way you hold your phone is top-tier.", "Congratulations on existing today!", "Wow, your silence is incredibly profound right now!"], "total_compliments": 5, "interval_minutes_between_compliments": 10}',false,true,'2025-06-08 16:11:08.524701+02','assets/card/extreme/card-extreme (16).png','extreme'::public."prank_rarity_enum"),
	 ('Pirate Speak Phone','Ahoy, matey! Thy phone now be speakin'' like a proper pirate! (Changes phone language)',10,5,2,1,0,'declarative'::public."prank_type_enum",'{"target_language": "Pirate English"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/common/card-common (1).png','common'::public."prank_rarity_enum"),
	 ('Unlock Rickroll Surprise','Never gonna give you up... on pranking! (A Rick Astley video auto-opens once when the target unlocks their phone).',140,70,24,26,10,'declarative'::public."prank_type_enum",'{"video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "trigger_condition": "on_unlock_once", "action_description": "User must set up the target''s phone so that upon one specific unlock, a Rick Astley ''Never Gonna Give You Up'' video auto-plays (e.g., through an app, a browser tab left open and scripted, or a shortcut automation).", "proof_required_description": "Video of the target unlocking phone & Rickroll playing, or target''s confirmed reaction."}',true,true,'2025-06-08 16:11:08.524701+02','assets/card/extreme/card-extreme (17).png','extreme'::public."prank_rarity_enum"),
	 ('Fake System Update','A very official-looking (but fake) system update prompt appears.',5,3,1,0,0,'notification_spam'::public."prank_type_enum",'{"notification_body": "Tap to install critical security updates.", "notification_title": "System Update Required"}',false,true,'2025-06-08 15:45:39.891114+02','assets/card/common/card-common (3).png','common'::public."prank_rarity_enum"),
	 ('Whispering Meow Notifications','Did... did my phone just meow very softly? (Changes default notification sound to a tiny meow).',30,18,6,6,2,'declarative'::public."prank_type_enum",'{"new_notification_sound": "tiny_meow.mp3"}',true,true,'2025-06-08 15:45:39.891114+02','assets/card/rare/card-rare (13).png','rare'::public."prank_rarity_enum");
INSERT INTO public.pranks ("name",description,default_jeton_cost_equivalent,xp_reward_executor,xp_reward_target,coins_reward_executor,coins_reward_target,"type",config_details_json,requires_proof,is_active,created_at,image_url,rarity) VALUES
	 ('Absurd 8-Ball App','Ask it anything, get a nonsensical reply from a fake Magic 8-Ball app (e.g., Q: "Will I be rich?" A: "Ask your cat.").',105,52,17,19,7,'declarative'::public."prank_type_enum",'{"example_answers": ["Outlook... fluffy.", "Concentrate and ask again... after a nap.", "My sources say... maybe try interpretive dance?", "Cannot predict now, currently pondering the existential nature of cheese."], "action_description": "User must show the target a fake Magic 8-Ball app or website that gives absurd answers. The app could be one they create, find, or simulate via screenshots.", "proof_required_description": "Screenshot or short video of the fake 8-ball app giving an absurd answer to a question."}',true,true,'2025-06-08 16:11:08.524701+02','assets/card/extreme/card-extreme (15).png','extreme'::public."prank_rarity_enum");


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
	CONSTRAINT users_level_check CHECK ((level > 0)),
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

INSERT INTO public.users (username,email,password_hash,profile_picture_url,"level",xp_points,game_coins,created_at,updated_at) VALUES
	 ('utilisateur8','utilisateur8@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',8,4532,429,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.141284+02'),
	 ('utilisateur14','utilisateur14@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',4,4754,942,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.150889+02'),
	 ('utilisateur19','utilisateur19@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',6,1522,812,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.159019+02'),
	 ('utilisateur23','utilisateur23@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',9,4858,890,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.165053+02'),
	 ('utilisateur28','utilisateur28@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',2,1357,98,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.172446+02'),
	 ('utilisateur34','utilisateur34@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',6,3266,819,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.181753+02'),
	 ('utilisateur43','utilisateur43@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',4,977,45,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.195713+02'),
	 ('utilisateur2','utilisateur2@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',1,612,122,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.1321+02'),
	 ('utilisateur3','utilisateur3@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',8,1750,77,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.13366+02'),
	 ('utilisateur5','utilisateur5@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',2,853,778,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.136763+02');
INSERT INTO public.users (username,email,password_hash,profile_picture_url,"level",xp_points,game_coins,created_at,updated_at) VALUES
	 ('utilisateur7','utilisateur7@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',8,4072,166,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.139673+02'),
	 ('utilisateur6','utilisateur6@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',6,2873,426,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.138243+02'),
	 ('utilisateur9','utilisateur9@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',3,1019,68,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.14279+02'),
	 ('utilisateur10','utilisateur10@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',4,2891,641,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.144397+02'),
	 ('utilisateur13','utilisateur13@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',2,2604,779,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.149323+02'),
	 ('utilisateur12','utilisateur12@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',8,4008,136,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.147541+02'),
	 ('utilisateur15','utilisateur15@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',1,2360,647,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.152561+02'),
	 ('utilisateur17','utilisateur17@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',10,3960,382,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.156062+02'),
	 ('utilisateur16','utilisateur16@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',9,153,618,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.154446+02'),
	 ('utilisateur20','utilisateur20@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',4,2739,776,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.160667+02');
INSERT INTO public.users (username,email,password_hash,profile_picture_url,"level",xp_points,game_coins,created_at,updated_at) VALUES
	 ('utilisateur22','utilisateur22@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',10,1410,113,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.163606+02'),
	 ('utilisateur21','utilisateur21@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',2,1499,272,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.162131+02'),
	 ('utilisateur25','utilisateur25@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',7,2884,291,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.167988+02'),
	 ('utilisateur27','utilisateur27@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',5,2616,981,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.170962+02'),
	 ('utilisateur26','utilisateur26@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',9,2662,781,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.169409+02'),
	 ('utilisateur29','utilisateur29@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',4,4584,530,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.17391+02'),
	 ('utilisateur30','utilisateur30@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',10,1234,813,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.175415+02'),
	 ('utilisateur33','utilisateur33@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',2,2008,143,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.180125+02'),
	 ('utilisateur32','utilisateur32@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',1,905,651,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.178427+02'),
	 ('utilisateur36','utilisateur36@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',5,697,638,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.184972+02');
INSERT INTO public.users (username,email,password_hash,profile_picture_url,"level",xp_points,game_coins,created_at,updated_at) VALUES
	 ('utilisateur37','utilisateur37@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',6,3789,376,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.186546+02'),
	 ('utilisateur38','utilisateur38@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',6,4041,378,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.188064+02'),
	 ('utilisateur40','utilisateur40@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',2,4014,613,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.191086+02'),
	 ('utilisateur42','utilisateur42@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',9,2399,609,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.194247+02'),
	 ('utilisateur41','utilisateur41@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',1,108,684,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.192639+02'),
	 ('utilisateur44','utilisateur44@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',2,4154,827,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.19717+02'),
	 ('utilisateur45','utilisateur45@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',7,2824,898,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.198658+02'),
	 ('utilisateur1','utilisateur1@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',8,3295,485,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.13047+02'),
	 ('utilisateur48','utilisateur48@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',5,1540,536,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.203007+02');
INSERT INTO public.users (username,email,password_hash,profile_picture_url,"level",xp_points,game_coins,created_at,updated_at) VALUES
	 ('utilisateur49','utilisateur49@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',5,2585,74,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.204564+02'),
	 ('utilisateur50','utilisateur50@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',4,874,355,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.206134+02'),
	 ('utilisateur4','utilisateur4@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',3,3948,151,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.135239+02'),
	 ('utilisateur11','utilisateur11@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',2,2961,727,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.145915+02'),
	 ('utilisateur18','utilisateur18@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',4,4474,420,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.157581+02'),
	 ('utilisateur24','utilisateur24@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',7,1714,376,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.166541+02'),
	 ('utilisateur31','utilisateur31@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',4,1739,912,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.176898+02'),
	 ('utilisateur35','utilisateur35@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',4,1873,754,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.183327+02'),
	 ('utilisateur39','utilisateur39@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',7,238,989,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.189576+02');
INSERT INTO public.users (username,email,password_hash,profile_picture_url,"level",xp_points,game_coins,created_at,updated_at) VALUES
	 ('utilisateur46','utilisateur46@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',10,2388,697,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.2001+02'),
	 ('utilisateur47','utilisateur47@example.com','$2b$12$005ZD3qnSCy/7wfl//wPlOL/uZFtEa9jJ9vncolc1fd1GTQMI6gGC','https://i.pravatar.cc/300',5,3898,989,'2025-06-07 02:03:59.569579+02','2025-06-07 03:04:27.201563+02');


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
CREATE INDEX idx_missions_type ON public.missions USING btree (type);

-- Column comments

COMMENT ON COLUMN public.missions.target_value IS 'Ex: rendre 5 services, inviter 3 amis';
COMMENT ON COLUMN public.missions.jeton_reward IS 'Peut-on gagner des jetons/points de dette via missions?';
COMMENT ON COLUMN public.missions.prank_reward_id IS 'Récompense sous forme de prank "gratuit" à utiliser';
COMMENT ON COLUMN public.missions.repeat_cooldown_hours IS 'Si répétable, délai avant de pouvoir la refaire';
COMMENT ON COLUMN public.missions.unlock_level_required IS 'Niveau requis pour voir/faire cette mission';


-- public.pack_opening_log definition

-- Drop table

-- DROP TABLE public.pack_opening_log;

CREATE TABLE public.pack_opening_log (
	log_id serial4 NOT NULL,
	user_id int4 NOT NULL,
	pack_id int4 NOT NULL,
	prank_id int4 NOT NULL, -- The specific prank (from public.pranks) that was awarded.
	rarity_awarded public."prank_rarity_enum" NOT NULL, -- The rarity tier determined for this specific drop from the pack.
	opened_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT pack_opening_log_pkey PRIMARY KEY (log_id),
	CONSTRAINT fk_log_pack FOREIGN KEY (pack_id) REFERENCES public.prank_packs(pack_id) ON DELETE RESTRICT,
	CONSTRAINT fk_log_prank FOREIGN KEY (prank_id) REFERENCES public.pranks(prank_id) ON DELETE RESTRICT,
	CONSTRAINT fk_log_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);
CREATE INDEX idx_pack_opening_log_opened_at ON public.pack_opening_log USING btree (opened_at);
CREATE INDEX idx_pack_opening_log_pack_id ON public.pack_opening_log USING btree (pack_id);
CREATE INDEX idx_pack_opening_log_prank_id ON public.pack_opening_log USING btree (prank_id);
CREATE INDEX idx_pack_opening_log_user_id ON public.pack_opening_log USING btree (user_id);
COMMENT ON TABLE public.pack_opening_log IS 'Logs each individual prank awarded to a user from opening a prank pack.';

-- Column comments

COMMENT ON COLUMN public.pack_opening_log.prank_id IS 'The specific prank (from public.pranks) that was awarded.';
COMMENT ON COLUMN public.pack_opening_log.rarity_awarded IS 'The rarity tier determined for this specific drop from the pack.';


-- public.pack_prank_pool definition

-- Drop table

-- DROP TABLE public.pack_prank_pool;

CREATE TABLE public.pack_prank_pool (
	pack_id int4 NOT NULL,
	prank_id int4 NOT NULL,
	CONSTRAINT pack_prank_pool_pkey PRIMARY KEY (pack_id, prank_id),
	CONSTRAINT fk_pack_prank_pool_pack FOREIGN KEY (pack_id) REFERENCES public.prank_packs(pack_id) ON DELETE CASCADE,
	CONSTRAINT fk_pack_prank_pool_prank FOREIGN KEY (prank_id) REFERENCES public.pranks(prank_id) ON DELETE CASCADE
);
CREATE INDEX idx_pack_prank_pool_pack_id ON public.pack_prank_pool USING btree (pack_id);
CREATE INDEX idx_pack_prank_pool_prank_id ON public.pack_prank_pool USING btree (prank_id);
COMMENT ON TABLE public.pack_prank_pool IS 'Links which specific pranks are available to be dropped from which prank packs.';

INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (1,36),
	 (1,28),
	 (1,30),
	 (1,31),
	 (1,2),
	 (1,14),
	 (1,6),
	 (1,5),
	 (1,12),
	 (1,13);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (4,39),
	 (4,44),
	 (4,24),
	 (4,23),
	 (4,21),
	 (4,33),
	 (4,22),
	 (4,26),
	 (4,2),
	 (4,5);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (4,3),
	 (4,14),
	 (4,11),
	 (4,13),
	 (4,17),
	 (4,16),
	 (4,8),
	 (4,1),
	 (4,10),
	 (4,4);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (12,6),
	 (12,7),
	 (12,9),
	 (12,10),
	 (12,11),
	 (12,12),
	 (12,13),
	 (12,14),
	 (12,15),
	 (12,16);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (12,17),
	 (12,18),
	 (12,2),
	 (12,20),
	 (12,21),
	 (12,22),
	 (12,23),
	 (12,24),
	 (12,25),
	 (12,26);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (12,27),
	 (12,28),
	 (12,29),
	 (12,19),
	 (12,5),
	 (12,4),
	 (12,8),
	 (12,34),
	 (12,36),
	 (12,31);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (12,35),
	 (12,37),
	 (12,38),
	 (12,39),
	 (12,40),
	 (12,41),
	 (12,42),
	 (12,43),
	 (12,44),
	 (12,45);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (12,46),
	 (12,47),
	 (12,48),
	 (12,32),
	 (12,33),
	 (12,50),
	 (12,1),
	 (12,51),
	 (12,3),
	 (12,30);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (12,49),
	 (13,50),
	 (13,19),
	 (13,33),
	 (13,32),
	 (13,7),
	 (13,15),
	 (13,4),
	 (13,2),
	 (13,12);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (13,1),
	 (5,39),
	 (5,32),
	 (5,34),
	 (5,28),
	 (5,14),
	 (5,7),
	 (5,12),
	 (5,6),
	 (5,16);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (5,17),
	 (10,37),
	 (10,42),
	 (10,31),
	 (10,33),
	 (10,34),
	 (10,28),
	 (10,20),
	 (10,26),
	 (10,7);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (10,9),
	 (10,5),
	 (10,11),
	 (10,1),
	 (10,16),
	 (10,10),
	 (10,6),
	 (10,3),
	 (10,15),
	 (10,13);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (10,2),
	 (3,6),
	 (3,7),
	 (3,9),
	 (3,10),
	 (3,11),
	 (3,12),
	 (3,13),
	 (3,14),
	 (3,15);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (3,16),
	 (3,17),
	 (3,18),
	 (3,2),
	 (3,20),
	 (3,21),
	 (3,22),
	 (3,23),
	 (3,24),
	 (3,25);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (3,26),
	 (3,27),
	 (3,28),
	 (3,29),
	 (3,19),
	 (3,5),
	 (3,4),
	 (3,8),
	 (3,34),
	 (3,36);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (3,31),
	 (3,35),
	 (3,37),
	 (3,38),
	 (3,39),
	 (3,40),
	 (3,41),
	 (3,42),
	 (3,43),
	 (3,44);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (3,45),
	 (3,46),
	 (3,47),
	 (3,48),
	 (3,32),
	 (3,33),
	 (3,50),
	 (3,1),
	 (3,51),
	 (3,3);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (3,30),
	 (3,49),
	 (2,35),
	 (2,36),
	 (2,26),
	 (2,24),
	 (2,30),
	 (2,28),
	 (2,32),
	 (2,34);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (2,3),
	 (2,13),
	 (2,14),
	 (2,4),
	 (2,6),
	 (2,11),
	 (2,7),
	 (2,15),
	 (2,5),
	 (2,10);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (2,2),
	 (2,16),
	 (6,6),
	 (6,7),
	 (6,9),
	 (6,10),
	 (6,11),
	 (6,12),
	 (6,13),
	 (6,14);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (6,15),
	 (6,16),
	 (6,17),
	 (6,18),
	 (6,2),
	 (6,20),
	 (6,21),
	 (6,22),
	 (6,23),
	 (6,24);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (6,25),
	 (6,26),
	 (6,27),
	 (6,28),
	 (6,29),
	 (6,19),
	 (6,5),
	 (6,4),
	 (6,8),
	 (6,34);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (6,36),
	 (6,31),
	 (6,35),
	 (6,37),
	 (6,38),
	 (6,39),
	 (6,40),
	 (6,41),
	 (6,42),
	 (6,43);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (6,44),
	 (6,45),
	 (6,46),
	 (6,47),
	 (6,48),
	 (6,32),
	 (6,33),
	 (6,50),
	 (6,1),
	 (6,51);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (6,3),
	 (6,30),
	 (6,49),
	 (7,37),
	 (7,30),
	 (7,34),
	 (7,32),
	 (7,2),
	 (7,13),
	 (7,7);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (7,6),
	 (7,17),
	 (7,15),
	 (8,51),
	 (8,46),
	 (8,32),
	 (8,19),
	 (8,24),
	 (8,21),
	 (8,18);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (8,29),
	 (8,8),
	 (8,15),
	 (8,2),
	 (8,6),
	 (8,16),
	 (8,1),
	 (8,3),
	 (8,9),
	 (8,13);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (8,12),
	 (8,7),
	 (8,14),
	 (9,6),
	 (9,7),
	 (9,9),
	 (9,10),
	 (9,11),
	 (9,12),
	 (9,13);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (9,14),
	 (9,15),
	 (9,16),
	 (9,17),
	 (9,18),
	 (9,2),
	 (9,20),
	 (9,21),
	 (9,22),
	 (9,23);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (9,24),
	 (9,25),
	 (9,26),
	 (9,27),
	 (9,28),
	 (9,29),
	 (9,19),
	 (9,5),
	 (9,4),
	 (9,8);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (9,34),
	 (9,36),
	 (9,31),
	 (9,35),
	 (9,37),
	 (9,38),
	 (9,39),
	 (9,40),
	 (9,41),
	 (9,42);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (9,43),
	 (9,44),
	 (9,45),
	 (9,46),
	 (9,47),
	 (9,48),
	 (9,32),
	 (9,33),
	 (9,50),
	 (9,1);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (9,51),
	 (9,3),
	 (9,30),
	 (9,49),
	 (11,44),
	 (11,30),
	 (11,21),
	 (11,26),
	 (11,16),
	 (11,13);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (11,5),
	 (11,4),
	 (11,9),
	 (11,17),
	 (15,6),
	 (15,7),
	 (15,9),
	 (15,10),
	 (15,11),
	 (15,12);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (15,13),
	 (15,14),
	 (15,15),
	 (15,16),
	 (15,17),
	 (15,18),
	 (15,2),
	 (15,20),
	 (15,21),
	 (15,22);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (15,23),
	 (15,24),
	 (15,25),
	 (15,26),
	 (15,27),
	 (15,28),
	 (15,29),
	 (15,19),
	 (15,5),
	 (15,4);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (15,8),
	 (15,34),
	 (15,36),
	 (15,31),
	 (15,35),
	 (15,37),
	 (15,38),
	 (15,39),
	 (15,40),
	 (15,41);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (15,42),
	 (15,43),
	 (15,44),
	 (15,45),
	 (15,46),
	 (15,47),
	 (15,48),
	 (15,32),
	 (15,33),
	 (15,50);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (15,1),
	 (15,51),
	 (15,3),
	 (15,30),
	 (15,49),
	 (16,47),
	 (16,35),
	 (16,27),
	 (16,33),
	 (16,32);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (16,31),
	 (16,29),
	 (16,20),
	 (16,8),
	 (16,17),
	 (16,13),
	 (16,3),
	 (16,12),
	 (16,7),
	 (16,6);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (16,14),
	 (16,5),
	 (16,1),
	 (16,11),
	 (16,2),
	 (17,43),
	 (17,29),
	 (17,21),
	 (17,22),
	 (17,3);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (17,4),
	 (17,7),
	 (17,9),
	 (17,5),
	 (17,17),
	 (18,6),
	 (18,7),
	 (18,9),
	 (18,10),
	 (18,11);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (18,12),
	 (18,13),
	 (18,14),
	 (18,15),
	 (18,16),
	 (18,17),
	 (18,18),
	 (18,2),
	 (18,20),
	 (18,21);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (18,22),
	 (18,23),
	 (18,24),
	 (18,25),
	 (18,26),
	 (18,27),
	 (18,28),
	 (18,29),
	 (18,19),
	 (18,5);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (18,4),
	 (18,8),
	 (18,34),
	 (18,36),
	 (18,31),
	 (18,35),
	 (18,37),
	 (18,38),
	 (18,39),
	 (18,40);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (18,41),
	 (18,42),
	 (18,43),
	 (18,44),
	 (18,45),
	 (18,46),
	 (18,47),
	 (18,48),
	 (18,32),
	 (18,33);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (18,50),
	 (18,1),
	 (18,51),
	 (18,3),
	 (18,30),
	 (18,49),
	 (19,50),
	 (19,24),
	 (19,32),
	 (19,33);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (19,4),
	 (19,9),
	 (19,10),
	 (19,3),
	 (19,14),
	 (19,17),
	 (14,48),
	 (14,44),
	 (14,19),
	 (14,28);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (14,34),
	 (14,32),
	 (14,33),
	 (14,21),
	 (14,3),
	 (14,5),
	 (14,8),
	 (14,9),
	 (14,16),
	 (14,7);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (14,17),
	 (14,2),
	 (14,10),
	 (14,11),
	 (14,15),
	 (14,4),
	 (20,50),
	 (20,49),
	 (20,21),
	 (20,20);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (20,19),
	 (20,23),
	 (20,26),
	 (20,24),
	 (20,6),
	 (20,17),
	 (20,10),
	 (20,3),
	 (20,14),
	 (20,4);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (20,2),
	 (20,5),
	 (20,7),
	 (20,15),
	 (20,16),
	 (20,12),
	 (21,6),
	 (21,7),
	 (21,9),
	 (21,10);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (21,11),
	 (21,12),
	 (21,13),
	 (21,14),
	 (21,15),
	 (21,16),
	 (21,17),
	 (21,18),
	 (21,2),
	 (21,20);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (21,21),
	 (21,22),
	 (21,23),
	 (21,24),
	 (21,25),
	 (21,26),
	 (21,27),
	 (21,28),
	 (21,29),
	 (21,19);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (21,5),
	 (21,4),
	 (21,8),
	 (21,34),
	 (21,36),
	 (21,31),
	 (21,35),
	 (21,37),
	 (21,38),
	 (21,39);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (21,40),
	 (21,41),
	 (21,42),
	 (21,43),
	 (21,44),
	 (21,45),
	 (21,46),
	 (21,47),
	 (21,48),
	 (21,32);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (21,33),
	 (21,50),
	 (21,1),
	 (21,51),
	 (21,3),
	 (21,30),
	 (21,49),
	 (22,35),
	 (22,38),
	 (22,27);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (22,31),
	 (22,24),
	 (22,33),
	 (22,22),
	 (22,23),
	 (22,17),
	 (22,10),
	 (22,8),
	 (22,2),
	 (22,16);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (22,5),
	 (22,12),
	 (22,6),
	 (22,9),
	 (22,11),
	 (22,13),
	 (22,1),
	 (23,47),
	 (23,31),
	 (23,18);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (23,32),
	 (23,13),
	 (23,16),
	 (23,7),
	 (23,17),
	 (23,5),
	 (23,1),
	 (24,6),
	 (24,7),
	 (24,9);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (24,10),
	 (24,11),
	 (24,12),
	 (24,13),
	 (24,14),
	 (24,15),
	 (24,16),
	 (24,17),
	 (24,18),
	 (24,2);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (24,20),
	 (24,21),
	 (24,22),
	 (24,23),
	 (24,24),
	 (24,25),
	 (24,26),
	 (24,27),
	 (24,28),
	 (24,29);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (24,19),
	 (24,5),
	 (24,4),
	 (24,8),
	 (24,34),
	 (24,36),
	 (24,31),
	 (24,35),
	 (24,37),
	 (24,38);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (24,39),
	 (24,40),
	 (24,41),
	 (24,42),
	 (24,43),
	 (24,44),
	 (24,45),
	 (24,46),
	 (24,47),
	 (24,48);
INSERT INTO public.pack_prank_pool (pack_id,prank_id) VALUES
	 (24,32),
	 (24,33),
	 (24,50),
	 (24,1),
	 (24,51),
	 (24,3),
	 (24,30),
	 (24,49);

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


-- public.user_pack_inventory definition

-- Drop table

-- DROP TABLE public.user_pack_inventory;

CREATE TABLE public.user_pack_inventory (
	user_pack_inventory_id serial4 NOT NULL,
	user_id int4 NOT NULL,
	pack_id int4 NOT NULL,
	quantity int4 DEFAULT 1 NOT NULL, -- Number of units of this specific pack type the user owns.
	acquired_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT user_pack_inventory_pkey PRIMARY KEY (user_pack_inventory_id),
	CONSTRAINT user_pack_inventory_quantity_check CHECK ((quantity > 0)),
	CONSTRAINT user_pack_inventory_user_id_pack_id_key UNIQUE (user_id, pack_id),
	CONSTRAINT fk_user_inventory_pack FOREIGN KEY (pack_id) REFERENCES public.prank_packs(pack_id) ON DELETE CASCADE,
	CONSTRAINT fk_user_inventory_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);
CREATE INDEX idx_user_pack_inventory_pack_id ON public.user_pack_inventory USING btree (pack_id);
CREATE INDEX idx_user_pack_inventory_user_id ON public.user_pack_inventory USING btree (user_id);
COMMENT ON TABLE public.user_pack_inventory IS 'Stores prank packs owned by users but not yet opened.';

-- Column comments

COMMENT ON COLUMN public.user_pack_inventory.quantity IS 'Number of units of this specific pack type the user owns.';


-- public.user_pranks definition

-- Drop table

-- DROP TABLE public.user_pranks;

CREATE TABLE public.user_pranks (
	user_prank_id serial4 NOT NULL,
	user_id int4 NOT NULL,
	prank_id int4 NOT NULL,
	quantity int4 DEFAULT 1 NOT NULL, -- How many instances of this prank the user possesses.
	obtained_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT uq_user_prank UNIQUE (user_id, prank_id),
	CONSTRAINT user_pranks_pkey PRIMARY KEY (user_prank_id),
	CONSTRAINT user_pranks_quantity_check CHECK ((quantity > 0)),
	CONSTRAINT fk_prank FOREIGN KEY (prank_id) REFERENCES public.pranks(prank_id) ON DELETE CASCADE,
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE
);
CREATE INDEX idx_user_pranks_prank_id ON public.user_pranks USING btree (prank_id);
CREATE INDEX idx_user_pranks_user_id ON public.user_pranks USING btree (user_id);
COMMENT ON TABLE public.user_pranks IS 'Stores pranks owned by each user.';

-- Column comments

COMMENT ON COLUMN public.user_pranks.quantity IS 'How many instances of this prank the user possesses.';

-- Constraint comments

COMMENT ON CONSTRAINT uq_user_prank ON public.user_pranks IS 'Ensures a user has only one record per prank type; quantity field handles multiples.';


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
	CONSTRAINT executed_pranks_pkey PRIMARY KEY (executed_prank_id)
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
	CONSTRAINT services_pkey PRIMARY KEY (service_id)
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


-- public.executed_pranks foreign keys

ALTER TABLE public.executed_pranks ADD CONSTRAINT executed_pranks_chosen_prank_id_fkey FOREIGN KEY (chosen_prank_id) REFERENCES public.pranks(prank_id) ON DELETE RESTRICT;
ALTER TABLE public.executed_pranks ADD CONSTRAINT executed_pranks_executor_id_fkey FOREIGN KEY (executor_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
ALTER TABLE public.executed_pranks ADD CONSTRAINT executed_pranks_service_being_repaid_id_fkey FOREIGN KEY (service_being_repaid_id) REFERENCES public.services(service_id) ON DELETE CASCADE;
ALTER TABLE public.executed_pranks ADD CONSTRAINT executed_pranks_target_id_fkey FOREIGN KEY (target_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


-- public.services foreign keys

ALTER TABLE public.services ADD CONSTRAINT fk_services_executed_prank FOREIGN KEY (executed_prank_id_repayment) REFERENCES public.executed_pranks(executed_prank_id) ON DELETE SET NULL;
ALTER TABLE public.services ADD CONSTRAINT services_beneficiary_id_fkey FOREIGN KEY (beneficiary_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
ALTER TABLE public.services ADD CONSTRAINT services_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.service_categories(category_id) ON DELETE SET NULL;
ALTER TABLE public.services ADD CONSTRAINT services_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
ALTER TABLE public.services ADD CONSTRAINT services_repayment_service_id_fkey FOREIGN KEY (repayment_service_id) REFERENCES public.services(service_id) ON DELETE SET NULL;



-- DROP FUNCTION public.update_updated_at_column();

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